import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import { Button } from "./ui/Button"

import { Link, useNavigate } from "react-router-dom"

interface InvoiceActionsProps {
  isInvoicePage: boolean
  invoiceId: string
}

export function InvoiceActions({
  isInvoicePage,
  invoiceId,
}: InvoiceActionsProps) {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" sizes="icon">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-semibold">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!isInvoicePage && (
          <DropdownMenuItem onClick={() => navigate(`/invoice/${invoiceId}`)}>
            View
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => navigate(`/invoice/edit/${invoiceId}`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Mark as paid</DropdownMenuItem>
        <DropdownMenuItem>Add to draft</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
