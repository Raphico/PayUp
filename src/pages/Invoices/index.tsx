import * as React from "react"
import { Link } from "react-router-dom"

import { PageHeader, PageHeaderHeading } from "../../components/PageHeader"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table"
import { Button, buttonVariants } from "../../components/ui/Button"
import { Skeleton } from "../../components/Skeleton"

import { cn, formatCurrency, formatFirestoreTimestamp } from "../../lib/utils"

import { useAuth } from "../../contexts/AuthContext"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchUserInvoices } from "./fetchUserInvoices"
import { PaginationState } from "./schema"
import { columns } from "./columns"

export function InvoicesPage() {
  const { currentUser } = useAuth()

  if (!currentUser) return null

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1, // should be adjusted to a larger number in production
    pageAction: null,
    firstIndex: null,
    lastIndex: null,
  })

  const canGetPrevPage = pagination.pageIndex !== 0

  const { data, isPending } = useQuery({
    queryKey: ["invoices", currentUser.uid, pagination],
    queryFn: () => fetchUserInvoices(currentUser.uid, pagination),
    placeholderData: keepPreviousData,
  })

  const handleGetPrevPage = () => {
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: --prevState.pageIndex,
      pageAction: "PREV",
    }))
  }

  const handleGetNextPage = () => {
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: ++prevState.pageIndex,
      pageAction: "NEXT",
    }))
  }

  React.useEffect(() => {
    if (data) {
      setPagination((prevState) => ({
        ...prevState,
        firstIndex: data?.firstIndex,
        lastIndex: data?.lastIndex,
      }))
    }
  }, [data])

  return (
    <div className="space-y-8">
      <div className="flex-between">
        <PageHeader>
          <PageHeaderHeading>Invoices</PageHeaderHeading>
        </PageHeader>

        <Link
          to="/invoice/new"
          className={cn(buttonVariants({ variant: "accent", sizes: "sm" }))}
        >
          New invoice
        </Link>
      </div>

      <div className="space-y-6">
        <div className="rounded-md border">
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
              ) : data?.userInvoices.length ? (
                data.userInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>
                      {formatFirestoreTimestamp(invoice.date)}
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center h-24"
                  >
                    No Invoices
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button
            variant="outline"
            sizes="sm"
            aria-label="Get previous page"
            onClick={handleGetPrevPage}
            disabled={!data?.userInvoices || !canGetPrevPage}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            sizes="sm"
            aria-label="Get next page"
            onClick={handleGetNextPage}
            disabled={
              !data?.userInvoices ||
              data.userInvoices.length < pagination.pageSize
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
