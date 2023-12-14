import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../lib/firebase"
import { FirebaseError } from "firebase/app"

import { InvoiceInputs } from "../invoiceValidator"

export async function updateInvoice(
  values: InvoiceInputs & {
    amount: number
  },
  invoiceId: string
) {
  try {
    const invoiceRef = doc(db, "invoices", invoiceId)

    updateDoc(invoiceRef, values)
  } catch (error) {
    error instanceof FirebaseError
      ? console.error(error.message)
      : console.error(error)

    throw new Error("Unable to update invoice")
  }
}
