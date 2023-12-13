import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table"
import { Skeleton } from "../../components/Skeleton"

import { cn, formatCurrency, formatFirestoreTimestamp } from "../../lib/utils"

import type { Timestamp } from "firebase/firestore"
import { InvoiceStatus } from "../../types"
import { ColumnDef } from "./schema"

interface InvoicesTableProps {
  invoices?: {
    id: string
    date: Timestamp
    client: string
    status: InvoiceStatus
    amount: number
  }[]
  isPending: boolean
  columns: ColumnDef[]
}

export function InvoicesTable({
  isPending,
  invoices,
  columns,
}: InvoicesTableProps) {
  const visibleColumns = columns.filter((column) => column.isVisible)

  return (
    <div className="rounded-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((column) => (
              <TableHead key={column.id}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length}>
                <Skeleton className="w-full h-10" />
              </TableCell>
            </TableRow>
          ) : invoices?.length ? (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                {visibleColumns.map((column) => (
                  <TableCell key={column.id}>
                    {/* Render the corresponding data based on the column ID */}
                    {column.id === "invoice" && invoice.id}
                    {column.id === "date" &&
                      formatFirestoreTimestamp(invoice.date)}
                    {column.id === "client" && invoice.client}
                    {column.id === "status" && (
                      <div
                        className={cn(
                          `flex-center w-20 rounded-md p-2 capitalize`,
                          {
                            "bg-pending/10 text-pending":
                              invoice.status.includes("pending"),
                            "bg-paid/10 text-paid":
                              invoice.status.includes("paid"),
                            "bg-draft/10 text-draft":
                              invoice.status.includes("drafted"),
                          }
                        )}
                      >
                        {invoice.status}
                      </div>
                    )}
                    {column.id === "amount" && formatCurrency(invoice.amount)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length}
                className="text-center h-24"
              >
                No Invoices
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
