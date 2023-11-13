import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Invoice } from "../../types"

export const fetchUserInvoicesStats = async (uid: string) => {
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

    totalInvoicesAmount += invoice.itemList.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

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

  const averageInvoiceAmount =
    totalInvoicesAmount && totalInvoicesAmount / totalInvoiceCount

  return {
    totalInvoiceCount,
    totalInvoicesAmount,
    averageInvoiceAmount,
    pendingInvoicesCount,
    draftedInvoicesCount,
    paidInvoicesCount,
  }
}
