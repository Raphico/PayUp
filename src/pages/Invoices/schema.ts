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

export type ColumnDef =
  | {
      id: string
      header: string | JSX.Element
      canHide: true
      isVisible: boolean
    }
  | {
      id: string
      header: string | JSX.Element
      canHide: false
      isVisible?: true
    }
