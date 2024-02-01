import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Main from './common/components/main-component'
import { Toaster } from './components/ui/sonner'
import { ThemeProvider } from './components/ui/theme-provider'
import './index.css'
import { router } from './pages/router'

const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Main>
          <RouterProvider router={router} />
        </Main>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
)
