import { useEffect } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="RPS Anime - Rock Paper Scissors" />
        <meta property="og:description" content="Play Rock Paper Scissors with mystical anime style on Farcaster!" />
        <meta property="og:image" content="https://rps-anime-final.vercel.app/icon.png" />
        <meta property="og:url" content="https://rps-anime-final.vercel.app" />
        <meta property="og:type" content="website" />
        
        {/* Farcaster Frame Meta Tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://rps-anime-final.vercel.app/icon.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1:1" />
        <meta property="fc:frame:button:1" content="Play RPS Anime" />
        <meta property="fc:frame:button:1:action" content="launch_frame" />
        <meta property="fc:frame:button:1:target" content="https://rps-anime-final.vercel.app" />
        
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
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
      if (typeof window !== 'undefined') {
        try {
          const { sdk } = await import('@farcaster/frame-sdk');
          await sdk.actions.ready();
          console.log('Farcaster SDK initialized!');
        } catch (error) {
          console.log('Running outside Farcaster context');
        }
      }
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
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  return (
    <main className="pt-16 p-4 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold">{message}</h1>
      <p className="mt-4">{details}</p>
      {stack && (<pre className="mt-4 p-4 bg-gray-800 rounded overflow-x-auto"><code>{stack}</code></pre>)}
    </main>
  );
}
