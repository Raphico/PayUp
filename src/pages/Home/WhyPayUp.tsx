import { Icons } from "../../components/Icons"
import { Card, CardContent } from "../../components/ui/Card"

export function WhyPayUp() {
  return (
    <section className="flex-center flex-col gap-8">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold">
        Why PayUp?
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 max-w-4xl">
        <Card>
          <CardContent className="space-y-2 p-8">
            <Icons.invoices
              className="h-10 w-10 text-foreground"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold">
              Intuitive Invoice Creation
            </h3>
            <p className="text-muted">
              Effortlessly generate professional invoices with a user-friendly
              interface
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-8">
            <Icons.dashboard
              className="h-10 w-10 text-white"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold">Dashboard Overview</h3>
            <p className="text-muted">
              Monitor key metrics and gain insights into your financial
              performance at a glance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-8">
            <Icons.interface
              className="h-10 w-10 text-foreground"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold">User-Friendly Interface</h3>
            <p className="text-muted">
              Save time and reduce complexity with an intuitive design
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-8">
            <Icons.table
              className="h-10 w-10 text-foreground"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold">
              Dynamic Invoice Management
            </h3>
            <p className="text-muted">
              Effortlessly manage invoices with a dynamic table that tailors to
              your need
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
