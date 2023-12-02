import * as React from "react"
import { NavLink } from "react-router-dom"

import { ThemeToggler } from "./ThemeToggler"
import { Icons } from "./Icons"

import { cn } from "../lib/utils"
import { Skeleton } from "./Skeleton"

const UserMenu = React.lazy(() =>
  import("./UserMenu").then((module) => ({ default: module.UserMenu }))
)

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
          <Icons.logo className="w-8 h-8" aria-hidden="true" />

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
          <React.Suspense
            fallback={<Skeleton className="h-8 w-8 rounded-full" />}
          >
            <UserMenu />
          </React.Suspense>
        </div>
      </nav>
    </header>
  )
}
