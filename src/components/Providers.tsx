import { Toaster } from "sonner"
import { AuthProvider } from "../contexts/AuthContext"
import { ThemeProvider } from "../contexts/ThemeContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ProvidersProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-center" richColors />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
