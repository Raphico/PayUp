import { Button } from "./ui/Button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { useNavigate, useLocation } from "react-router-dom"

export function GoBack() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoBack = () => {
    // If the current path is "/invoice/:id", always redirect to "/invoice"
    if (location.pathname.startsWith("/invoice/")) {
      navigate("/invoices")
    }
    // If the current path is "/sign-in", always redirect to "/"
    else if (location.pathname === "/sign-in") {
      navigate("/")
    }
    // Otherwise, use the default behavior to go back to the previous page
    else {
      navigate(-1)
    }
  }

  return (
    <Button onClick={handleGoBack} variant="ghost">
      <ChevronLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />
      Go back
    </Button>
  )
}
