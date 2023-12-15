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

interface AuthProviderProps {
  children: React.ReactNode
}

export type OAuthStrategy = "oauth_google" | "oauth_github"

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

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signOutCurrentUser,
        signIn,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
