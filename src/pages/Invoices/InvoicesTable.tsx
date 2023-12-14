import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table"
import { Skeleton } from "../../components/Skeleton"

import { formatCurrency, formatFirestoreTimestamp } from "../../lib/utils"

import type { Timestamp } from "firebase/firestore"
import { InvoiceStatus } from "../../types"
import { ColumnDef } from "./schema"

import { useNavigate } from "react-router-dom"
import { InvoiceStatusBadge } from "../../components/InvoiceStatusBadge"
import { InvoiceActions } from "../../components/InvoiceActions"

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
  const navigate = useNavigate()
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
              <TableRow
                key={invoice.id}
                className="cursor-pointer"
                onClick={() => navigate(`/invoice/${invoice.id}`)}
              >
                {visibleColumns.map((column) => (
                  <TableCell key={column.id}>
                    {/* Render the corresponding data based on the column ID */}
                    {column.id === "invoice" && invoice.id}
                    {column.id === "date" &&
                      formatFirestoreTimestamp(invoice.date)}
                    {column.id === "client" && invoice.client}
                    {column.id === "status" && (
                      <InvoiceStatusBadge status={invoice.status} />
                    )}
                    {column.id === "amount" && formatCurrency(invoice.amount)}
                  </TableCell>
                ))}
                <TableCell>
                  <InvoiceActions
                    isDrafted={invoice.status === "drafted"}
                    isInvoicePage={false}
                    isMarkedAsPaid={invoice.status === "pending"}
                    invoiceId={invoice.id}
                  />
                </TableCell>
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
