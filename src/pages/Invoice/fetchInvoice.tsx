import { doc, getDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Invoice } from "../../types"
import { FirebaseError } from "firebase/app"

export const fetchInvoice = async (
  invoiceId: string,
  uid: string
): Promise<Invoice | undefined> => {
  try {
    const invoiceRef = doc(db, "invoices", invoiceId)

    const invoiceQuerySnapshot = await getDoc(invoiceRef)

    if (invoiceQuerySnapshot.exists()) {
      const invoice = {
        ...invoiceQuerySnapshot.data(),
        id: invoiceQuerySnapshot.id,
      } as Invoice
      if (invoice.uid === uid) {
        return invoice
      } else {
        throw new Error("Not authorized")
      }
    } else {
      throw new Error("Document doesn't exists")
    }

    return undefined
  } catch (error) {
    error instanceof FirebaseError
      ? console.error(error.message)
      : console.error(error)

    throw new Error("Unable to fetch recent invoices")
  }
}
