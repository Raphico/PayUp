import * as React from "react"
import { Outlet } from "react-router-dom"

import { MainNav } from "./MainNav"
import { Icons } from "./Icons"

import { ProtectedRoute } from "./ProtectedRoute"

export function RootLayout() {
  return (
    <ProtectedRoute>
      <div className="space-y-4 sm:space-y-8">
        <MainNav />
        <main className="max-width">
          <React.Suspense
            fallback={
              <div className="flex-center">
                <Icons.spinner className="h-6 w-6 text-muted animate-spin" />
              </div>
            }
          >
            <Outlet />
          </React.Suspense>
        </main>
      </div>
    </ProtectedRoute>
  )
}
