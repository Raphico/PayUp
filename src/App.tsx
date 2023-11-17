import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { SignInPage } from "./pages/SignIn"
import { DashboardPage } from "./pages/Dashboard"
import { InvoicesPage } from "./pages/Invoices"
import { CreateInvoicePage } from "./pages/Invoice/new"
import { InvoiceLayout } from "./pages/Invoice/InvoiceLayout"
import { RootLayout } from "./components/RootLayout"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route element={<RootLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
      </Route>
      <Route element={<InvoiceLayout />}>
        <Route path="/invoice/new" element={<CreateInvoicePage />} />
      </Route>
    </Routes>
  )
}
