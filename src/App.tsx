import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { SignInPage } from "./pages/SignIn"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  )
}
