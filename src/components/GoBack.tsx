import { Button } from "./ui/Button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

export function GoBack() {
  const navigate = useNavigate()

  const PREVIOUS_PAGE = -1

  return (
    <Button onClick={() => navigate(PREVIOUS_PAGE)} variant="ghost">
      <ChevronLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />
      Go back
    </Button>
  )
}
