import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClientDir = path.join(__dirname, "../dist/client");

// Find the main entry JS and CSS files
const assetsDir = path.join(distClientDir, "assets");
let mainJs = "index.js";
let mainCss = "";

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  
  // Find main JS (usually index-*.js)
  const jsFiles = files.filter((f) => f.startsWith("index-") && f.endsWith(".js"));
  if (jsFiles.length > 0) {
    mainJs = jsFiles[0];
  }
  
  // Find main CSS (usually styles-*.css)
  const cssFiles = files.filter((f) => f.startsWith("styles-") && f.endsWith(".css"));
  if (cssFiles.length > 0) {
    mainCss = cssFiles[0];
  }
}

// Generate index.html in dist/client/
const htmlContent = `<!DOCTYPE html>
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
    ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJs}"><\/script>
  </body>
</html>`;

const indexPath = path.join(distClientDir, "index.html");
fs.writeFileSync(indexPath, htmlContent);

console.log(`✓ Generated ${indexPath}`);
console.log(`  Entry: ./assets/${mainJs}`);
if (mainCss) console.log(`  Styles: ./assets/${mainCss}`);

