import { PageHeader, PageHeaderHeading } from "../../components/PageHeader"
import { Skeleton } from "../../components/Skeleton"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card"
import { RecentInvoices } from "./RecentInvoices"
import { InvoiceChart } from "./InvoiceChart"
import { Icons } from "../../components/Icons"

import { useAuth } from "../../contexts/AuthContext"
import { catchError, formatCurrency } from "../../lib/utils"

import { fetchUserInvoicesStats } from "./fetchUserInvoicesStats"
import { useQuery } from "@tanstack/react-query"

export function DashboardPage() {
  const { currentUser } = useAuth()

  if (!currentUser) return null

  const {
    data: invoiceStats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard", currentUser.uid],
    queryFn: () => fetchUserInvoicesStats(currentUser.uid),
  })

  if (error) {
    catchError(error)
  }

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>

      <div className="grid gap-4 py-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted font-medium text-sm">
                Total Invoices
              </CardTitle>
              <Icons.invoices
                className="h-4 w-4 text-muted"
                aria-hidden="true"
              />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <h2 className="font-bold text-xl">
                  {invoiceStats ? invoiceStats.totalInvoiceCount : "N/A"}
                </h2>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted font-medium text-sm">
                Total Invoice Amount
              </CardTitle>
              <Icons.amount className="h-4 w-4 text-muted" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <h2 className="font-bold text-xl">
                  {invoiceStats
                    ? formatCurrency(invoiceStats.totalInvoicesAmount)
                    : "N/A"}
                </h2>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted font-medium text-sm">
                Average Invoice Amount
              </CardTitle>
              <Icons.amount className="h-4 w-4 text-muted" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <h2 className="font-bold text-xl">
                  {invoiceStats
                    ? formatCurrency(invoiceStats.averageInvoiceAmount)
                    : "N/A"}
                </h2>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-7 gap-4">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <InvoiceChart
                pendingInvoicesCount={invoiceStats?.pendingInvoicesCount || 0}
                paidInvoicesCount={invoiceStats?.paidInvoicesCount || 0}
                draftedInvoicesCount={invoiceStats?.draftedInvoicesCount || 0}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentInvoices />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
