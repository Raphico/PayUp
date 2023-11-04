import { useTheme } from "../../context/ThemeContext"
import { Button } from "../ui/Button"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"

export function ThemeToggler() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="ghost" sizes="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-6 w-6" aria-hidden="true" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
