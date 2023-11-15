import { useQuery } from "@tanstack/react-query"
import { fetchRecentInvoices } from "./fetchRecentInvoices"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

export function RecentInvoices() {
  const { currentUser } = useAuth()

  if (!currentUser) return null

  const { data: invoices } = useQuery({
    queryKey: ["recent-invoices"],
    queryFn: () => fetchRecentInvoices(currentUser.uid),
  })

  return (
    <div>
      {invoices?.length === 0 ? (
        <p className="flex-center text-muted font-medium">No recent invoices</p>
      ) : (
        <div className="grid gap-4">
          {invoices?.map((invoice) => {
            const totalInvoiceAmount = invoice.itemList.reduce(
              (total, item) => total + item.quantity * item.price,
              0
            )
            return (
              <Link
                to={`/invoice/${invoice.id}`}
                key={invoice.id}
                className="flex-between"
              >
                <div className="grid gap-1">
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-muted">{invoice.invoiceDate}</p>
                </div>
                <p className="font-medium text-lg">${totalInvoiceAmount}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
