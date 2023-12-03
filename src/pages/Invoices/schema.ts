import { Timestamp } from "firebase/firestore"
import { z } from "zod"

export const tableInvoiceSchema = z.object({
  id: z.string(),
  date: z.string(),
  client: z.string(),
  status: z.string(),
  amount: z.string(),
})

export type TableInvoice = z.infer<typeof tableInvoiceSchema>

export interface PaginationState {
  pageIndex: number
  pageSize: number
  pageAction: "NEXT" | "PREV" | null
  lastIndex: Timestamp | null
  firstIndex: Timestamp | null
}
