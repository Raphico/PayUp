import { GoBack } from "../components/GoBack"
import { Button } from "../components/ui/Button"

export function SignInPage() {
  return (
    <main className="max-width y-paddings">
      <GoBack />
      <section className="w-full flex-center flex-col gap-10 y-paddings">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" width={40} height={40} />
          <h2 className="heading2">PayUp</h2>
        </div>

        <div className="grid gap-4 w-full max-w-sm mx-auto">
          <Button variant="outline">Sign in with Google</Button>
          <Button>Sign in with Github</Button>
        </div>
      </section>
    </main>
  )
}