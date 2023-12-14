import { InvoiceForm } from "../InvoiceForm"
import { Skeleton } from "../../../components/Skeleton"

import { Navigate, useNavigate, useParams } from "react-router-dom"

import { fetchInvoice } from "../fetchInvoice"
import { useMutation, useQuery } from "@tanstack/react-query"

import { useAuth } from "../../../contexts/AuthContext"
import { catchError } from "../../../lib/utils"
import { InvoiceInputs } from "../invoiceValidator"
import { updateInvoice } from "./updateInvoice"

export function EditInvoicePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { currentUser } = useAuth()

  if (!currentUser || !id) return null

  const {
    data: invoice,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["invoice", currentUser.uid, id],
    queryFn: () => fetchInvoice(id, currentUser.uid),
  })

  const { mutate: editInvoice, isPending } = useMutation({
    mutationFn: async (values: InvoiceInputs) => {
      const amount = values.itemList.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      await updateInvoice({ ...values, amount }, id)
    },
    onSuccess() {
      navigate(`/invoice/${id}`)
    },
    onError(error) {
      catchError(error)
    },
  })

  if (error) {
    catchError(error)
  }

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-10 rounded-md max-w-5xl mx-auto" />
      ) : invoice ? (
        <InvoiceForm
          onSubmit={editInvoice}
          isPending={isPending}
          invoice={invoice}
        />
      ) : (
        <Navigate to="/invoices" />
      )}
    </>
  )
}
