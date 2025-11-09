import React from 'react'
import ReactDOM from 'react-dom/client'
import { FarcasterProvider } from '@farcaster/frame-react'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FarcasterProvider>
      <App />
    </FarcasterProvider>
  </React.StrictMode>,
)