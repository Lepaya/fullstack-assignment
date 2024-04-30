import React from "react"
import { GlobalStyles } from "./global-styles"
import DashboardPage from "./pages/dashboard-page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DashboardPage />
      </QueryClientProvider>

      <GlobalStyles />
    </>
  )
}

export default App
