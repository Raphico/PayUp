import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Invoice } from "../../types"
import { FirebaseError } from "firebase/app"
import { formatCurrency } from "../../lib/utils"

export const fetchUserInvoicesStats = async (uid: string) => {
  try {
    const invoicesRef = collection(db, "invoices")

    const userInvoicesQuery = query(invoicesRef, where("uid", "==", uid))
    const querySnapshot = await getDocs(userInvoicesQuery)

    const totalInvoiceCount = querySnapshot.size

    let totalInvoicesAmount = 0
    let pendingInvoicesCount = 0
    let draftedInvoicesCount = 0
    let paidInvoicesCount = 0

    querySnapshot.docs.forEach((doc) => {
      const invoice = doc.data() as Invoice

      totalInvoicesAmount += invoice.amount

      switch (invoice.invoiceStatus) {
        case "pending":
          pendingInvoicesCount++
          break
        case "paid":
          paidInvoicesCount++
          break
        default:
          draftedInvoicesCount++
          break
      }
    })

    const averageInvoiceAmount = totalInvoicesAmount
      ? totalInvoicesAmount / totalInvoiceCount
      : 0

    return {
      totalInvoiceCount,
      totalInvoicesAmount,
      averageInvoiceAmount,
      pendingInvoicesCount,
      draftedInvoicesCount,
      paidInvoicesCount,
    }
  } catch (error) {
    error instanceof FirebaseError
      ? console.error(error.message)
      : console.error(error)

    throw new Error("Unable to fetch user invoice stats")
  }
}
