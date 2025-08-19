import { I18nextProvider } from "react-i18next"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RootStack } from "./navigation"
import i18n from "./src/i18n/i18n"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <RootStack />
      </I18nextProvider>
    </QueryClientProvider>
  )
}
