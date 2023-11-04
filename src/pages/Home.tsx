import { AuthNav } from "../components/layouts/AuthNav"
import { buttonVariants } from "../components/ui/Button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"

export function HomePage() {
  return (
    <>
      <AuthNav />
      <main className="container py-12 sm:py-24">
        <section className="hero">
          <Link
            to="https://github.com/Raphico/payUp"
            target="_blank"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <GitHubLogoIcon className="h-4 w-4" aria-hidden="true" />
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
