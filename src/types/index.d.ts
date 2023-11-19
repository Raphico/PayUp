interface ItemList {
  name: string
  quantity: number
  price: number
}

export enum InvoiceStatus {
  PENDING = "pending",
  PAID = "paid",
  DRAFTED = "drafted",
}

export interface Invoice {
  id: string
  uid: string
  invoiceDate: string
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
}
