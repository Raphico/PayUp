import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FirebaseError } from "firebase/app"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../lib/firebase"
import { catchError } from "../lib/utils"

export const useInvoice = () => {
  const queryClient = useQueryClient()

  const markInvoiceAsPaidMutation = useMutation({
    mutationFn: async (invoiceId: string) => {
      try {
        const invoiceRef = doc(db, "invoices", invoiceId)
        await updateDoc(invoiceRef, { invoiceStatus: "paid" })
      } catch (error) {
        error instanceof FirebaseError
          ? console.error(error.message)
          : console.error(error)
        throw new Error("Unable to mark invoice as paid")
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "invoice" || query.queryKey[0] === "invoices",
      })
    },
    onError(error) {
      catchError(error)
    },
  })

  const addInvoiceToDraftMutation = useMutation({
    mutationFn: async (invoiceId: string) => {
      try {
        const invoiceRef = doc(db, "invoices", invoiceId)
        await updateDoc(invoiceRef, { invoiceStatus: "drafted" })
      } catch (error) {
        error instanceof FirebaseError
          ? console.error(error.message)
          : console.error(error)
        throw new Error("Unable to add invoice to draft")
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "invoice" || query.queryKey[0] === "invoices",
      })
    },
    onError(error) {
      catchError(error)
    },
  })

  const deleteInvoiceMutation = useMutation({
    mutationFn: async (invoiceId: string) => {
      try {
        const invoiceRef = doc(db, "invoices", invoiceId)
        await deleteDoc(invoiceRef)
      } catch (error) {
        error instanceof FirebaseError
          ? console.error(error.message)
          : console.error(error)
        throw new Error("Unable to delete invoice")
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "invoice" || query.queryKey[0] === "invoices",
      })
    },
    onError(error) {
      catchError(error)
    },
  })

  return {
    markInvoiceAsPaidMutation,
    addInvoiceToDraftMutation,
    deleteInvoiceMutation,
  }
}
