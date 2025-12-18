import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router"
import { SidebarProvider } from './components/ui/sidebar.tsx'
import { Provider } from 'react-redux'
import store from './stores/stores.tsx'



createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <SidebarProvider >
        <App />
      </SidebarProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
