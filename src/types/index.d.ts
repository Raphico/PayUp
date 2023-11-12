interface BillFrom {
  streetAddress: string
  postalCode: string
  country: string
}

interface BillTo extends BillFrom {
  name: string
  email: string
}

interface ItemList {
  name: string
  quantity: number
  price: number
}

enum InvoiceStatus {
  PENDING = "pending",
  PAID = "paid",
  DRAFTED = "drafted",
}

export interface Invoice {
  id: string
  uid: string
  invoiceDate: string
  dueDate: string
  invoiceStatus: InvoiceStatus
  billFrom: BillFrom
  billTo: BillTo
  serviceDescription: string
  itemList: ItemList[]
}
