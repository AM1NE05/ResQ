import { VercelResponse } from "@vercel/node";
import type { VercelRequest } from "@vercel/node";
import fs from "fs";
import path from "path";

/**
 * Option B+: Serve index.html with dynamic asset discovery
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // In Vercel, try relative paths from function directory
    let htmlPath = path.join(__dirname, "../dist/client/index.html");
    
    // Fallback: try from root
    if (!fs.existsSync(htmlPath)) {
      htmlPath = path.join(process.cwd(), "dist/client/index.html");
    }

    if (fs.existsSync(htmlPath)) {
      const content = fs.readFileSync(htmlPath, "utf-8");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.status(200).send(content);
    } else {
      // Files not found - generate fallback with inline detection
      const assetsDir = path.join(__dirname, "../dist/client/assets");
      let mainJs = "";

      try {
        if (fs.existsSync(assetsDir)) {
          const files = fs.readdirSync(assetsDir);
          // Find the main JS file (usually named index-*.js)
          mainJs = files
            .filter((f) => f.startsWith("index-") && f.endsWith(".js"))
            .pop() || "";
        }
      } catch (e) {
        console.warn("Could not read assets directory:", e);
      }

      const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#1a1f3a" />
  <title>ResQ Najda — نجدتك على بُعد ضغطة زر</title>
  <meta name="description" content="ResQ Najda: emergency SOS, live incident map, and citizen video reports for Tunisia." />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  ${
    fs.existsSync(path.join(__dirname, "../dist/client/assets/styles-BHLsaSNJ.css"))
      ? '<link rel="stylesheet" href="./assets/styles-BHLsaSNJ.css" />'
      : ""
  }
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./assets/${mainJs || "index.js"}"></script>
</body>
</html>`;

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.status(200).send(fallbackHtml);
    }
  } catch (error) {
    console.error("Handler error:", error);
    const errorHtml = `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h1>503 Service Unavailable</h1>
  <p>Error: ${String(error)}</p>
</body>
</html>`;
    res.status(503).send(errorHtml);
  }
}
