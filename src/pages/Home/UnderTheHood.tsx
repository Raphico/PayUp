import { Icons } from "../../components/Icons"
import { Card, CardContent } from "../../components/ui/Card"

export function UnderTheHood() {
  return (
    <section className="flex-center flex-col gap-8">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold">
        Under the Hood
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 max-w-4xl">
        <Card>
          <CardContent className="space-y-2 p-8">
            <Icons.react className="h-10 w-10 text-white" aria-hidden="true" />
            <h3 className="text-lg font-semibold">React</h3>
            <p className="text-muted">
              Client component, Context API, hooks, Code splitting
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-8">
            <Icons.database
              className="h-10 w-10 text-foreground"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold">Firebase & Tanstack Query</h3>
            <p className="text-muted">
              User & Data Management with firebase with react query for handling
              data fetching and mutations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 p-8">
            <Icons.component
              className="h-10 w-10 text-foreground"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold">Components</h3>
            <p className="text-muted">
              UI components built using Radix UI and styled with Tailwind CSS.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
