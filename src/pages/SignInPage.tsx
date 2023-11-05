import { GoBack } from "../components/GoBack"
import { OAuthSignIn } from "../components/OAuthSignIn"

export function SignInPage() {
  return (
    <main className="max-width y-paddings">
      <GoBack />
      <section className="w-full flex-center flex-col gap-10 y-paddings">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" width={40} height={40} />
          <h2 className="heading2">PayUp</h2>
        </div>

        <OAuthSignIn />
      </section>
    </main>
  )
}
