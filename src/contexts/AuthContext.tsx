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

interface AuthProviderProps {
  children: React.ReactNode
}

export type OAuthStrategy = "oauth_google" | "oauth_github"

interface AuthContextProps {
  currentUser: User | null
  signOutCurrentUser: () => Promise<void>
  signIn: (strategy: OAuthStrategy) => Promise<UserCredential> | undefined
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
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)

  const signOutCurrentUser = () => {
    return signOut(auth)
  }

  const signIn = (strategy: OAuthStrategy) => {
    switch (strategy) {
      case "oauth_google":
        return signInWithPopup(auth, new GoogleAuthProvider())

      case "oauth_github":
        return signInWithPopup(auth, new GithubAuthProvider())
      default:
        return
    }
  }

  React.useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => setCurrentUser(user))

    return unSubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signOutCurrentUser,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
