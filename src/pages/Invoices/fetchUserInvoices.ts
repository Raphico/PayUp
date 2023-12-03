import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore"
import { db } from "../../lib/firebase"
import { FirebaseError } from "firebase/app"

import { Invoice } from "../../types"
import { PaginationState } from "./schema"

export const fetchUserInvoices = async (
  uid: string,
  pagination: PaginationState
) => {
  try {
    const { pageSize, lastIndex, firstIndex, pageIndex, pageAction } =
      pagination
    const isFirstPage = pageIndex === 0

    const invoicesRef = collection(db, "invoices")

    let userInvoicesQuery = query(invoicesRef)

    if (pageAction === "NEXT") {
      userInvoicesQuery = query(
        invoicesRef,
        where("uid", "==", uid),
        orderBy("invoiceDate", "desc"),
        startAfter(lastIndex),
        limit(pageSize)
      )
    } else if (!isFirstPage && pageAction === "PREV") {
      userInvoicesQuery = query(
        invoicesRef,
        where("uid", "==", uid),
        startAfter(firstIndex),
        limit(pageSize)
      )
    } else {
      userInvoicesQuery = query(
        invoicesRef,
        where("uid", "==", uid),
        orderBy("invoiceDate", "desc"),
        limit(pageSize)
      )
    }

    const userInvoicesQuerySnapshot = await getDocs(userInvoicesQuery)

    const userInvoices = userInvoicesQuerySnapshot.docs.map((doc) => {
      const data = doc.data() as Invoice

      return {
        id: doc.id,
        date: data.invoiceDate,
        client: data.clientName,
        status: data.invoiceStatus,
        amount: data.amount,
      }
    })

    return {
      userInvoices,
      lastIndex: userInvoices[userInvoices.length - 1].date,
      firstIndex: userInvoices[0].date,
    }
  } catch (error) {
    error instanceof FirebaseError
      ? console.error(error.message)
      : console.error(error)

    throw new Error("Unable to fetch invoices")
  }
}
