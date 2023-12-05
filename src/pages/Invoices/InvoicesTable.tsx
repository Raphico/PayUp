import { columns } from "./columns"

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

interface InvoicesTableProps {
  invoices?: {
    id: string
    date: Timestamp
    client: string
    status: InvoiceStatus
    amount: number
  }[]
  isPending: boolean
}

export function InvoicesTable({ isPending, invoices }: InvoicesTableProps) {
  return (
    <div className="rounded-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Skeleton className="w-full h-10" />
              </TableCell>
            </TableRow>
          ) : invoices?.length ? (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{formatFirestoreTimestamp(invoice.date)}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>
                  <div
                    className={cn(
                      `flex-center w-20 rounded-md p-2 capitalize`,
                      {
                        "bg-pending/10 text-pending":
                          invoice.status.includes("pending"),
                        "bg-paid/10 text-paid": invoice.status.includes("paid"),
                        "bg-draft/10 text-draft":
                          invoice.status.includes("drafted"),
                      }
                    )}
                  >
                    {invoice.status}
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24">
                No Invoices
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
