import { VercelResponse } from "@vercel/node";
import type { VercelRequest } from "@vercel/node";

/**
 * SPA Catch-all handler
 * Serves index.html for all routes to enable client-side routing
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#1a1f3a" />
    <title>ResQ Najda — نجدتك على بُعد ضغطة زر</title>
    <meta name="description" content="ResQ Najda: emergency SOS, live incident map, and citizen video reports for Tunisia." />
    <meta property="og:title" content="ResQ Najda" />
    <meta property="og:description" content="Emergency response platform — SOS, live map, citizen reports." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="stylesheet" href="/assets/styles-BHLsaSNJ.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-CM8jaH84.js"><\/script>
  </body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(html);
}
