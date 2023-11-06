import { Link } from "react-router-dom"

import { Logo } from "../../components/Logo"
import { buttonVariants } from "../../components/ui/Button"
import { ThemeToggler } from "../../components/ThemeToggler"

export function AuthNav() {
  return (
    <header className="site-header">
      <nav className="max-width flex-between">
        <Logo />

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
