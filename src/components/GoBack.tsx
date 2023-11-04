import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { buttonVariants } from "./ui/Button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

export function GoBack() {
  return (
    <Link
      to="../"
      className={cn(buttonVariants({ variant: "ghost" }), "gap-2")}
    >
      <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
      Go back
    </Link>
  )
}
