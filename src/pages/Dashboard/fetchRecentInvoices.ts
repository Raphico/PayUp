import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { db } from "../../lib/firebase"
import { Invoice } from "../../types"

export const fetchRecentInvoices = async (uid: string) => {
  const invoicesRef = collection(db, "invoices")

  const userInvoicesQuery = query(
    invoicesRef,
    where("uid", "==", uid),
    orderBy("invoiceDate", "desc"),
    limit(5)
  )
  const querySnapshot = await getDocs(userInvoicesQuery)

  return querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Invoice)
  )
}
