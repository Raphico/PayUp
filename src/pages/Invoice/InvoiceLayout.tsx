import { Outlet } from "react-router-dom"
import { GoBack } from "../../components/GoBack"
import { ProtectedRoute } from "../../components/ProtectedRoute"

export function InvoiceLayout() {
  return (
    <ProtectedRoute>
      <div className="max-width py-4">
        <GoBack />
        <main className="w-full py-4">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  )
}
