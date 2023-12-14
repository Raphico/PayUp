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

import { useNavigate } from "react-router-dom"
import { useInvoice } from "../hooks/useInvoice"

interface InvoiceActionsProps {
  isInvoicePage: boolean
  invoiceId: string
  isMarkedAsPaid: boolean
  isDrafted: boolean
}

export function InvoiceActions({
  isInvoicePage,
  invoiceId,
  isMarkedAsPaid,
  isDrafted,
}: InvoiceActionsProps) {
  const navigate = useNavigate()

  const {
    markInvoiceAsPaidMutation,
    addInvoiceToDraftMutation,
    deleteInvoiceMutation,
  } = useInvoice()

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
        {!isMarkedAsPaid && (
          <DropdownMenuItem
            onClick={() => markInvoiceAsPaidMutation.mutate(invoiceId)}
            disabled={markInvoiceAsPaidMutation.isPending}
          >
            Mark as paid
          </DropdownMenuItem>
        )}
        {!isDrafted && (
          <DropdownMenuItem
            onClick={() => addInvoiceToDraftMutation.mutate(invoiceId)}
            disabled={addInvoiceToDraftMutation.isPending}
          >
            Add to draft
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            deleteInvoiceMutation.mutate(invoiceId)
            isInvoicePage && navigate("/invoices")
          }}
          disabled={deleteInvoiceMutation.isPending}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
