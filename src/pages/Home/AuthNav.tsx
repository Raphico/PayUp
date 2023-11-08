import { Link } from "react-router-dom"

import { buttonVariants } from "../../components/ui/Button"
import { ThemeToggler } from "../../components/ThemeToggler"
import { Icons } from "../../components/Icons"

export function AuthNav() {
  return (
    <header className="site-header">
      <nav className="max-width flex-between">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8" aria-hidden="true" />
          <span className="hidden font-bold lg:inline-block">PayUp</span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggler />
          <Link to="/sign-in" className={buttonVariants()}>
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  )
}
