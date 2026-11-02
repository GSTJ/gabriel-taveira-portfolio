const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const puppeteer = require("puppeteer");
const { setTimeout: delay } = require("node:timers/promises");

// A production build of the exact checkout, served by the capture workflow.
const sourceUrl = process.env.DEMO_SOURCE_URL ?? "http://127.0.0.1:3000/en-US";

async function capture() {
  const frames = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-frames-"));
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH ?? process.env.CHROME_BIN,
    args: ["--disable-dev-shm-usage", "--no-first-run"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
    const response = await page.goto(sourceUrl, { waitUntil: "networkidle0" });
    const heading = await page.$eval("h1", (node) => node.textContent);
    if (!response?.ok() || !heading.includes("I build apps")) {
      throw new Error("Capture source is not the English portfolio");
    }
    await page.evaluate(() => document.fonts.ready);
    // Each frame must finish before the next scroll changes the page.
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < 24; i++) {
      await page.evaluate((step) => window.scrollTo(0, step * 100), i);
      await delay(150);
      await page.screenshot({
        path: path.join(frames, `${String(i).padStart(3, "0")}.png`),
      });
    }
    /* eslint-enable no-await-in-loop */
    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-framerate",
        "4",
        "-i",
        path.join(frames, "%03d.png"),
        "-filter_complex",
        "scale=640:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse",
        "-loop",
        "0",
        "demo.gif",
      ],
      { stdio: "inherit" },
    );
  } finally {
    await browser.close();
    fs.rmSync(frames, { recursive: true, force: true });
  }
}

void capture();
