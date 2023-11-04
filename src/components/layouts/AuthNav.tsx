import { Link } from "react-router-dom"

import { Logo } from "../Logo"
import { buttonVariants } from "../ui/Button"
import { ThemeToggler } from "./ThemeToggler"

export function AuthNav() {
  return (
    <header className="site-header">
      <nav className="container flex-between">
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
