import { Navigate } from "react-router-dom"
import { GoBack } from "../../components/GoBack"
import { Icons } from "../../components/Icons"
import { useAuth } from "../../contexts/AuthContext"
import { OAuthSignIn } from "./OAuthSignIn"

export function SignInPage() {
  const { currentUser } = useAuth()

  if (currentUser) {
    return <Navigate to="/dashboard" />
  }

  return (
    <main className="max-width y-paddings">
      <GoBack />
      <section className="w-full flex-center flex-col gap-10 y-paddings">
        <div className="flex-center flex-col gap-4">
          <Icons.logo className="h-12 w-12" aria-hidden="true" />
          <h1 className="font-medium text-3xl">Sign in</h1>
        </div>

        <OAuthSignIn />
      </section>
    </main>
  )
}
