import { AuthNav } from "./AuthNav"
import { Icons } from "../../components/Icons"
import { buttonVariants } from "../../components/ui/Button"

import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"
import { UnderTheHood } from "./UnderTheHood"
import { WhyPayUp } from "./WhyPayUp"

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

        <WhyPayUp />

        <UnderTheHood />

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
