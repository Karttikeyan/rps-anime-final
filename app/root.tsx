import React, { useEffect } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* CDN Farcaster SDK – carga global */}
        <script async src="https://unpkg.com/@farcaster/miniapp-sdk@latest/dist/index.umd.js"></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    const initSDK = async () => {
      // Espera DOM ready para timing perfecto
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSDK);
        return;
      }

      let retries = 0;
      const maxRetries = 10;
      const checkSDK = async () => {
        if (retries > maxRetries) {
          console.warn('SDK max retries reached');
          return;
        }

        if (typeof window !== 'undefined' && window.sdk && window.sdk.actions) {
          try {
            await window.sdk.actions.ready();  // Oculta splash, muestra app
            console.log('Farcaster SDK initialized!');
          } catch (error) {
            console.warn('SDK ready failed:', error);
          }
        } else {
          retries++;
          setTimeout(checkSDK, 300);  // Retry cada 300ms
        }
      };

      checkSDK();
    };

    initSDK();
  }, []);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main style={{ paddingTop: '4rem', padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre style={{ width: '100%', padding: '1rem', overflowX: 'auto' }>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}