import { AuthNav } from "./AuthNav"
import { buttonVariants } from "../../components/ui/Button"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Icons } from "../../components/Icons"

export function HomePage() {
  return (
    <>
      <AuthNav />
      <main className="max-width y-paddings">
        <section className="hero">
          <Link
            to="https://github.com/Raphico/payUp"
            target="_blank"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.github className="h-4 w-4 mr-2" aria-hidden="true" />
            Github
          </Link>

          <h1 className="hero-heading">
            A powerful tool for managing and creating invoices efficiently
          </h1>
          <p className="hero-subtitle">
            Simplify your invoicing and billing with Your Invoice App. Manage
            your finances with ease.
          </p>
          <Link to="/sign-in" className={buttonVariants({ variant: "accent" })}>
            Get started
          </Link>
        </section>
      </main>
    </>
  )
}
