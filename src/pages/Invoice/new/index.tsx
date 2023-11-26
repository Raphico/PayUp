import { useMutation } from "@tanstack/react-query"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../lib/firebase"

import { useAuth } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

import { InvoiceInputs } from "../invoiceValidator"
import { InvoiceForm } from "../InvoiceForm"

import { catchError } from "../../../lib/utils"
import { generateInvoiceId } from "./generateInvoiceId"

export function CreateInvoicePage() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  if (!currentUser) return null

  const { mutate: createInvoice, isPending } = useMutation({
    mutationFn: async (values: InvoiceInputs) => {
      const invoiceId = generateInvoiceId()
      const amount = values.itemList.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )

      await setDoc(doc(db, "invoices", invoiceId), {
        ...values,
        invoiceStatus: "pending",
        uid: currentUser.uid,
        amount,
      })
    },
    onSuccess() {
      navigate("/invoices")
    },
    onError(error) {
      catchError(error)
    },
  })

  return <InvoiceForm onSubmit={createInvoice} isPending={isPending} />
}
