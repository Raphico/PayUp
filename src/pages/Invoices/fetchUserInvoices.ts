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

    // Increase the limit by 1 to check for the next page
    const increasedPageSize = pageSize + 1

    if (pageAction === "NEXT") {
      userInvoicesQuery = query(
        invoicesRef,
        where("uid", "==", uid),
        orderBy("invoiceDate", "desc"),
        startAfter(lastIndex),
        limit(increasedPageSize)
      )
    } else if (!isFirstPage && pageAction === "PREV") {
      userInvoicesQuery = query(
        invoicesRef,
        where("uid", "==", uid),
        orderBy("invoiceDate", "desc"),
        startAfter(firstIndex),
        limit(increasedPageSize)
      )
    } else {
      userInvoicesQuery = query(
        invoicesRef,
        where("uid", "==", uid),
        orderBy("invoiceDate", "desc"),
        limit(increasedPageSize)
      )
    }

    const userInvoicesQuerySnapshot = await getDocs(userInvoicesQuery)
    const allInvoices = userInvoicesQuerySnapshot.docs.map((doc) => {
      const data = doc.data() as Invoice

      return {
        id: doc.id,
        date: data.invoiceDate,
        client: data.clientName,
        status: data.invoiceStatus,
        amount: data.amount,
      }
    })

    // Check if there's a next page
    const hasNextPage = allInvoices.length === increasedPageSize

    // If there's a next page, remove the extra invoice
    const userInvoices = hasNextPage ? allInvoices.slice(0, -1) : allInvoices

    return {
      userInvoices,
      hasNextPage,
      lastIndex:
        userInvoices.length > 0
          ? userInvoices[userInvoices.length - 1].date
          : null,
      firstIndex: userInvoices.length > 0 ? userInvoices[0].date : null,
    }
  } catch (error) {
    error instanceof FirebaseError
      ? console.error(error.message)
      : console.error(error)
    throw new Error("Unable to fetch invoices")
  }
}
