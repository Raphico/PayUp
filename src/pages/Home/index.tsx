import { AuthNav } from "./AuthNav"
import { Card, CardContent } from "../../components/ui/Card"
import { Icons } from "../../components/Icons"
import { buttonVariants } from "../../components/ui/Button"

import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"

export function HomePage() {
  return (
    <>
      <AuthNav />
      <main className="max-width y-paddings space-y-20">
        <section className="hero">
          <h1 className="hero-heading">
            A powerful tool for managing and creating invoices efficiently
          </h1>
          <p className="hero-subtitle">
            Simplify your invoicing and billing with Your Invoice App. Manage
            your finances with ease.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/sign-in"
              className={buttonVariants({ variant: "accent" })}
            >
              Get started
            </Link>
            <Link
              to="https://github.com/Raphico/payUp"
              target="_blank"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Icons.github className="h-4 w-4 mr-2" aria-hidden="true" />
              Github
            </Link>
          </div>
        </section>

        <img src="/dashboard.png" alt="PayUp dashboard page" />

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
                  Effortlessly generate professional invoices with a
                  user-friendly interface
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
                <h3 className="text-lg font-semibold">
                  User-Friendly Interface
                </h3>
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
                  Effortlessly manage invoices with a dynamic table that tailors
                  to your need
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="flex-center flex-col gap-8">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold">
            Under the Hood
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 max-w-4xl">
            <Card>
              <CardContent className="space-y-2 p-8">
                <Icons.react
                  className="h-10 w-10 text-white"
                  aria-hidden="true"
                />
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
                <h3 className="text-lg font-semibold">
                  Firebase & Tanstack Query
                </h3>
                <p className="text-muted">
                  User & Data Management with firebase with react query for
                  handling data fetching and mutations
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
                  UI components built using Radix UI and styled with Tailwind
                  CSS.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer>
          <p className="text-center">
            Built by{" "}
            <Link to="https://github.com/Raphico" className="underline">
              Raphico
            </Link>
            . Hosted on{" "}
            <Link to="https://vercel.com" className="underline">
              Vercel
            </Link>
            . The source code is available on{" "}
            <Link to="https://github.com/Raphico/payUp" className="underline">
              Github
            </Link>
            .
          </p>
        </footer>
      </main>
    </>
  )
}
