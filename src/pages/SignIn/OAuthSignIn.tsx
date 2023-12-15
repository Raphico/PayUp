import * as React from "react"
import { OAuthStrategy, useAuth } from "../../contexts/AuthContext"
import { Button } from "../../components/ui/Button"
import { Icons } from "../../components/Icons"
import { catchError } from "../../lib/utils"

const oauthProviders = [
  {
    name: "Google",
    strategy: "oauth_google",
    icon: "google",
  },
  {
    name: "Github",
    strategy: "oauth_github",
    icon: "github",
  },
] satisfies {
  name: string
  strategy: OAuthStrategy
  icon: keyof typeof Icons
}[]

export function OAuthSignIn() {
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)

  const oauthSignIn = async (strategy: OAuthStrategy) => {
    try {
      setIsLoading(strategy)

      await signIn(strategy)
    } catch (error) {
      setIsLoading(null)
      catchError(error)
    }
  }

  return (
    <div className="grid gap-4 w-full max-w-sm mx-auto">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            onClick={() => oauthSignIn(provider.strategy)}
            variant="outline"
            key={provider.name}
            disabled={isLoading !== null}
          >
            {isLoading === provider.strategy ? (
              <Icons.spinner
                className="h-4 w-4 animate-spin mr-2"
                aria-hidden="true"
              />
            ) : (
              <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
            )}
            Sign in with {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
