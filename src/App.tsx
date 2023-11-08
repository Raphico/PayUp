import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { SignInPage } from "./pages/SignIn"
import { RootLayout } from "./components/RootLayout"
import { DashboardPage } from "./pages/Dashboard"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route element={<RootLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}
