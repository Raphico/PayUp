import { useMutation } from "@tanstack/react-query"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../../lib/firebase"

import { useAuth } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

import { InvoiceInputs } from "../invoiceValidator"
import { InvoiceForm } from "../InvoiceForm"

import { catchError } from "../../../lib/utils"

export function CreateInvoicePage() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  if (!currentUser) return null

  const { mutate: createInvoice, isPending } = useMutation({
    mutationFn: async (values: InvoiceInputs) => {
      const invoicesRef = collection(db, "invoices")
      await addDoc(invoicesRef, { ...values, uid: currentUser.uid })
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
