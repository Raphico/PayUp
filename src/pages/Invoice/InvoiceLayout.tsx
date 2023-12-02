import * as React from "react"
import { Outlet } from "react-router-dom"

import { GoBack } from "../../components/GoBack"
import { Icons } from "../../components/Icons"

import { ProtectedRoute } from "../../components/ProtectedRoute"

export function InvoiceLayout() {
  return (
    <ProtectedRoute>
      <div className="max-width py-4">
        <GoBack />
        <main className="w-full py-4">
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
