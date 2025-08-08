import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import router from './routes/routes.ts'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/app/store.ts'
import { ThemeProvider } from './Providers/theme.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ReduxProvider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
)
