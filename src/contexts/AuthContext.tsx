import * as React from "react"
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { auth } from "../lib/firebase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Icons } from "../components/Icons"
import { useLocation } from "react-router-dom"

interface AuthProviderProps {
  children: React.ReactNode
}

export type OAuthStrategy = "oauth_google" | "oauth_github"

const authRequiredRoutes = ["/dashboard", "/invoice", "/invoices"]

interface AuthContextProps {
  currentUser: User | null
  signOutCurrentUser: () => Promise<void>
  signIn: (strategy: OAuthStrategy) => Promise<UserCredential | undefined>
}

const AuthContext = React.createContext<AuthContextProps | null>(null)

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("useTheme is only accessible within the theme provider")
  }

  return context
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { pathname } = useLocation()
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = React.useState(true)

  const { data: currentUser = null } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return auth.currentUser
    },
  })

  const signInMutationFn = useMutation({
    mutationFn: async (strategy: OAuthStrategy) => {
      switch (strategy) {
        case "oauth_google":
          return signInWithPopup(auth, new GoogleAuthProvider())

        case "oauth_github":
          return signInWithPopup(auth, new GithubAuthProvider())

        default:
          return
      }
    },
  })

  const signOutCurrentUser = async () => {
    return signOut(auth).then(() => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    })
  }

  const signIn = async (strategy: OAuthStrategy) => {
    return signInMutationFn.mutateAsync(strategy).then((userCredential) => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      return userCredential
    })
  }

  React.useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      queryClient.setQueryData(["user"], user)
      setIsLoading(false)
    })

    return unSubscribe
  }, [queryClient])

  const isAuthRequiredRoute = authRequiredRoutes.some((route) =>
    pathname.startsWith(route)
  )

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signOutCurrentUser,
        signIn,
      }}
    >
      {isLoading && isAuthRequiredRoute ? (
        <div className="min-h-screen w-full flex-center flex-col gap-2">
          <Icons.logo className="h-10 w-10" />
          <p className="text-muted">authenticating...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
