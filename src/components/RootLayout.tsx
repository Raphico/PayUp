import { Outlet } from "react-router-dom"
import { MainNav } from "./MainNav"
import { ProtectedRoute } from "./ProtectedRoute"

export function RootLayout() {
  return (
    <ProtectedRoute>
      <div className="space-y-4 sm:space-y-8">
        <MainNav />
        <main className="max-width">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  )
}
