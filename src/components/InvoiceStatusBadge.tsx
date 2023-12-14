import { cn } from "../lib/utils"
import { InvoiceStatus } from "../types"

const STATUS_CLASSES = {
  pending: "bg-pending/10 text-pending",
  paid: "bg-paid/10 text-paid",
  drafted: "bg-draft/10 text-draft",
}

interface InvoiceStatusProps {
  status: InvoiceStatus
}

export function InvoiceStatusBadge({ status }: InvoiceStatusProps) {
  const statusClass = cn(
    "flex-center w-20 rounded-md p-2 capitalize",
    STATUS_CLASSES[status]
  )

  return <div className={statusClass}>{status}</div>
}
