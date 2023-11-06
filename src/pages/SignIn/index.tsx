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
        <div className="flex items-center gap-2">
          <Icons.logo className="h-10 w-10" aria-label="PayUp logo" />
          <h2 className="heading2">PayUp</h2>
        </div>

        <OAuthSignIn />
      </section>
    </main>
  )
}
