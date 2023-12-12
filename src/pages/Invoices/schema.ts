import type { Timestamp } from "firebase/firestore"
import { InvoiceStatus } from "../../types"

export interface PaginationState {
  pageIndex: number
  pageSize: number
  pageAction: "NEXT" | "PREV" | null
  lastIndex: Timestamp | null
  firstIndex: Timestamp | null
  statusFilterValue?: InvoiceStatus
}
