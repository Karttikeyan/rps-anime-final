import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthKitProvider } from '@farcaster/auth-kit';
import App from './App.jsx';
import "@farcaster/auth-kit/styles.css";  // Estilos requeridos para UI de auth

const config = {
  rpcUrl: "https://mainnet.optimism.io",  // RPC para Optimism (Farcaster chain)
  domain: "rps-anime-final.vercel.app",  // Tu dominio
  siweUri: "https://rps-anime-final.vercel.app/login",  // Endpoint para SIWE (crea si necesitas backend; por ahora dummy)
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthKitProvider config={config}>
      <App />
    </AuthKitProvider>
  </React.StrictMode>,
);