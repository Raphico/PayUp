import { NavLink } from "react-router-dom"
import { Logo } from "./Logo"
import { cn } from "../lib/utils"
import { ThemeToggler } from "./ThemeToggler"
import { UserMenu } from "./UserMenu"

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Invoices",
    href: "/invoices",
  },
]

export function MainNav() {
  return (
    <header className="site-header">
      <nav className="max-width flex-between">
        <div className="flex items-center gap-4">
          <Logo />
          {mainNavItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "font-medium text-muted text-sm sm:text-base hover:text-foreground",
                  {
                    "text-foreground": isActive,
                  }
                )
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggler />
          <UserMenu />
        </div>
      </nav>
    </header>
  )
}
