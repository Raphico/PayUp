import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table"
import { Card, CardContent } from "../../components/ui/Card"
import { InvoiceStatusBadge } from "../../components/InvoiceStatusBadge"
import { Skeleton } from "../../components/Skeleton"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { useAuth } from "../../contexts/AuthContext"
import { Navigate, useParams } from "react-router-dom"

import { useQuery } from "@tanstack/react-query"
import { fetchInvoice } from "./fetchInvoice"
import { catchError, formatFirestoreTimestamp } from "../../lib/utils"

export function InvoicePage() {
  const { id } = useParams()
  const { currentUser } = useAuth()

  if (!currentUser || !id) return null

  const {
    data: invoice,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["invoice", currentUser.uid, id],
    queryFn: () => fetchInvoice(id, currentUser.uid),
  })

  if (error) {
    catchError(error)
  }

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-10 rounded-md max-w-5xl mx-auto" />
      ) : invoice ? (
        <div className="space-y-4 w-full max-w-5xl mx-auto">
          <Card>
            <CardContent className="flex-between pt-4">
              <InvoiceStatusBadge status={invoice.invoiceStatus} />
              <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-8 p-8">
              <div className="flex items-start flex-col sm:flex-row gap-4 justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-muted">{invoice.clientName}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted">
                    {invoice.sellerStreetAddress}
                  </p>
                  <p className="text-sm text-muted">{invoice.sellerCity}</p>
                  <p className="text-sm text-muted">{invoice.sellerPostCode}</p>
                  <p className="text-sm text-muted">{invoice.sellerCountry}</p>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                <div className="grid gap-4">
                  <div className="text-left space-y-1">
                    <p className="text-muted text-sm">Invoice Date</p>
                    <p>{formatFirestoreTimestamp(invoice.invoiceDate)}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-muted text-sm">Payment due</p>
                    <p>{invoice.paymentTerms}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-muted text-sm">Bill to</p>
                  <p>{invoice.clientName}</p>
                  <div className="space-y-1">
                    <p className="text-muted">{invoice.clientStreetAddress}</p>
                    <p className="text-muted">{invoice.clientCity}</p>
                    <p className="text-muted"> {invoice.clientPostCode}</p>
                    <p className="text-muted">{invoice.clientCountry}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-muted text-sm">Sent to</p>
                  <p>{invoice.clientEmail}</p>
                </div>
              </div>

              <div className="border rounded-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="w-[100px]">Item</div>
                      </TableHead>
                      <TableHead>Qty.</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoice.itemList.map(({ item, quantity, price }) => (
                      <TableRow key={item}>
                        <TableCell>{item}</TableCell>
                        <TableCell>{quantity}</TableCell>
                        <TableCell>${price}</TableCell>
                        <TableCell>${price * quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3} className="text-lg">
                        Total:
                      </TableCell>
                      <TableCell className="text-left text-lg font-medium">
                        ${invoice.amount}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Navigate to="/invoices" />
      )}
    </>
  )
}
