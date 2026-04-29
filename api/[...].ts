import { VercelResponse } from "@vercel/node";
import type { VercelRequest } from "@vercel/node";

/**
 * Catch-all handler for SPA routing fallback
 * Vercel will first try to serve from public/dist/client/ (static files)
 * This handles any remaining routes that should load the SPA
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  // For any request that reaches this function, it means:
  // 1. It's not a static file (already served by Vercel's static engine)
  // 2. It's likely a route that should load the SPA
  
  // Return a simple error message for debugging
  res.status(404).json({
    error: "Not Found",
    message: "This handler should not be reached if static files are configured correctly",
    path: req.url,
    hint: "Check that Vercel is properly serving from the 'public' directory",
  });
}
