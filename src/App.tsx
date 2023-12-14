import * as React from "react"
import { Routes, Route } from "react-router-dom"

import { InvoiceLayout } from "./pages/Invoice/InvoiceLayout"
import { RootLayout } from "./components/RootLayout"
import { HomePage } from "./pages/Home"
import { SignInPage } from "./pages/SignIn"

const DashboardPage = React.lazy(() =>
  import("./pages/Dashboard").then((module) => ({
    default: module.DashboardPage,
  }))
)
const InvoicesPage = React.lazy(() =>
  import("./pages/Invoices").then((module) => ({
    default: module.InvoicesPage,
  }))
)
const CreateInvoicePage = React.lazy(() =>
  import("./pages/Invoice/new").then((module) => ({
    default: module.CreateInvoicePage,
  }))
)

const InvoicePage = React.lazy(() =>
  import("./pages/Invoice").then((module) => ({
    default: module.InvoicePage,
  }))
)

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
        <Route path="/invoice/:id" element={<InvoicePage />} />
      </Route>
    </Routes>
  )
}
