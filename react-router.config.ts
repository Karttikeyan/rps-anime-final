import type { Config } from "@react-router/dev/config";

export default {
  // Static site generation for Vercel
  ssr: false,
  // Base path for deployment
  basename: process.env.NODE_ENV === "production" ? "/" : undefined,
  
  // AÑADE ESTO:
  staticRoutes: [
    {
      path: "/.well-known/*",
      static: true
    }
  ]
} satisfies Config;