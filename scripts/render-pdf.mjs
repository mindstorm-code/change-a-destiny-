// Renders a freebie's HTML source to a PDF in public/downloads, using an
// installed Chrome or Edge in headless mode. No new dependencies.
//
//   node scripts/render-pdf.mjs <name> <output.pdf>
//   node scripts/render-pdf.mjs tuesday-test the-tuesday-test.pdf
//
// Reads pdf/<name>/<name>.html. Needs network access once, for the Google
// Fonts the HTML links (Inter, Oswald: the same faces the site uses).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [name, outName] = process.argv.slice(2);
if (!name || !outName) {
  console.error("Usage: node scripts/render-pdf.mjs <name> <output.pdf>");
  process.exit(1);
}

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error("No Chrome or Edge found. Set CHROME_PATH to a Chromium browser.");
  process.exit(1);
}

const src = resolve(`pdf/${name}/${name}.html`);
if (!existsSync(src)) {
  console.error(`No source at ${src}`);
  process.exit(1);
}
const outDir = resolve("public/downloads");
const out = resolve(outDir, outName);
mkdirSync(outDir, { recursive: true });

execFileSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--allow-file-access-from-files",
    "--no-pdf-header-footer",
    "--virtual-time-budget=8000",
    `--print-to-pdf=${out}`,
    pathToFileURL(src).href,
  ],
  { stdio: "inherit" },
);

const kb = Math.round(statSync(out).size / 1024);
console.log(`Wrote ${out} (${kb} KB)`);
