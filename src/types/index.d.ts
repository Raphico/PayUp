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

export interface Invoice {
  id: string
  uid: string
  invoiceDate: string
  dueDate: string
  invoiceStatus: string
  billFrom: BillFrom
  billTo: BillTo
  serviceDescription: string
  itemList: ItemList[]
}
