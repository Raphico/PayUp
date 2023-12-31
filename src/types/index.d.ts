import { Timestamp } from "firebase/firestore"

interface ItemList {
  item: string
  quantity: number
  price: number
}

export type InvoiceStatus = "pending" | "paid" | "drafted"

export interface Invoice {
  id: string
  uid: string
  invoiceDate: Timestamp
  paymentTerms: string
  invoiceStatus: InvoiceStatus

  sellerStreetAddress: string
  sellerCity: string
  sellerPostCode: string
  sellerCountry: string

  clientName: string
  clientEmail: string
  clientStreetAddress: string
  clientCity: string
  clientPostCode: string
  clientCountry: string

  serviceDescription: string
  itemList: ItemList[]

  amount: number
}
