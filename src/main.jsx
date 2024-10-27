import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './lib/store/store.js'
import { Toaster } from './components/ui/sonner.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position={"top-right"} closeButton />
    </Provider>
  </StrictMode>,
)