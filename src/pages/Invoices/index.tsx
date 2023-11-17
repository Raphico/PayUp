import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "../../components/PageHeader"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"
import { buttonVariants } from "../../components/ui/Button"

export function InvoicesPage() {
  return (
    <>
      <div className="flex-between">
        <PageHeader>
          <PageHeaderHeading>Invoices</PageHeaderHeading>
          <PageHeaderDescription></PageHeaderDescription>
        </PageHeader>

        <Link
          to="/invoice/new"
          className={cn(buttonVariants({ variant: "accent", sizes: "sm" }))}
        >
          New invoice
        </Link>
      </div>
    </>
  )
}
