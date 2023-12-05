import * as React from "react"
import { Link } from "react-router-dom"

import { PageHeader, PageHeaderHeading } from "../../components/PageHeader"
import { InvoicesTable } from "./InvoicesTable"
import { InvoicesTablePagination } from "./InvoicesTablePagination"
import { buttonVariants } from "../../components/ui/Button"

import { cn } from "../../lib/utils"

import { useAuth } from "../../contexts/AuthContext"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchUserInvoices } from "./fetchUserInvoices"
import { PaginationState } from "./schema"

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

  const hasPrevPage = pagination.pageIndex !== 0

  const { data, isPending } = useQuery({
    queryKey: ["invoices", currentUser.uid, pagination],
    queryFn: () => fetchUserInvoices(currentUser.uid, pagination),
    placeholderData: keepPreviousData,
  })

  const handleGetPrevPage = () => {
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: prevState.pageIndex - 1,
      pageAction: "PREV",
      firstIndex: data?.firstIndex || null,
    }))
  }

  const handleGetNextPage = () => {
    setPagination((prevState) => ({
      ...prevState,
      pageIndex: prevState.pageIndex + 1,
      pageAction: "NEXT",
      lastIndex: data?.lastIndex || null,
    }))
  }

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
        <InvoicesTable isPending={isPending} invoices={data?.userInvoices} />
        <InvoicesTablePagination
          handleGetPrevPage={handleGetPrevPage}
          handleGetNextPage={handleGetNextPage}
          hasPrevPage={!data?.userInvoices || !hasPrevPage}
          hasNextPage={!data?.userInvoices || !data?.hasNextPage}
        />
      </div>
    </div>
  )
}
