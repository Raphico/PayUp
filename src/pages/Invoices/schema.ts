import type { Timestamp } from "firebase/firestore"

export interface PaginationState {
  pageIndex: number
  pageSize: number
  pageAction: "NEXT" | "PREV" | null
  lastIndex: Timestamp | null
  firstIndex: Timestamp | null
}
