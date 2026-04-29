import { VercelResponse } from "@vercel/node";
import type { VercelRequest } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Try to find and serve static files from dist/client
    const clientDir = path.join(process.cwd(), "dist", "client");
    let filePath = path.join(clientDir, req.url === "/" ? "index.html" : req.url);

    // Prevent directory traversal
    if (!filePath.startsWith(clientDir)) {
      res.status(400).json({ error: "Invalid path" });
      return;
    }

    // If it's a directory or doesn't exist, try index.html (for SPA routing)
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(clientDir, "index.html");
    }

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      
      const contentTypes: Record<string, string> = {
        ".html": "text/html; charset=utf-8",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
      };

      const contentType = contentTypes[ext] || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      
      // Cache static assets
      if (ext === ".html") {
        res.setHeader("Cache-Control", "public, max-age=3600");
      } else {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }

      res.status(200).send(content);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
