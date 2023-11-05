import * as React from "react"

type ThemeProps = "dark" | "light"

interface ThemeContextProps {
  theme: ThemeProps
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = React.createContext<ThemeContextProps | null>(null)

const useTheme = () => {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme is only accessible within the theme provider")
  }

  return context
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const userPreferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light"

  const storedTheme = localStorage.getItem("theme")
  const initialTheme = storedTheme
    ? JSON.parse(storedTheme)
    : userPreferredTheme

  const [theme, setTheme] = React.useState<ThemeProps>(initialTheme)

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", JSON.stringify(newTheme))
  }

  React.useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, useTheme }
