import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './components/App.tsx'
import {QueryClientProvider, QueryClient} from "react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
  </StrictMode>,
)
