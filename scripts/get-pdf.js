const fs = require("fs");
const { execSync } = require("child_process");
const puppeteer = require("puppeteer");

const getPdf = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });

  const page = await browser.newPage();
  await page.goto("https://www.gabrieltaveira.com.br/en-US", {
    waitUntil: "networkidle0",
  });

  // Wait until every hero stat has rendered its final number — the count-up
  // hook only animates after mount, so without this we'd capture the
  // initial "0" frame.
  try {
    await page.waitForFunction(
      () => {
        const stats = Array.from(
          document.querySelectorAll(".ws-hero-stat-v"),
        );
        return (
          stats.length > 0 &&
          stats.every((el) => {
            const t = el.textContent?.trim() ?? "";
            return t !== "0" && t !== "0+";
          })
        );
      },
      { timeout: 5000 },
    );
  } catch (err) {
    console.warn(
      "Hero stats wait timed out, continuing with whatever is on screen:",
      err.message,
    );
  }

  // Evaluate the actual height of the page body
  const bodyHandle = await page.$("body");
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

  // For some reason, the pdf has extra padding at the bottom.
  // This is a hacky way to remove it.
  const EXTRA_BOTTOM_PADDING = 500;
  const WEB_WIDTH = 1200;

  const pdf = await page.pdf({
    printBackground: true,
    waitForFonts: true,
    width: WEB_WIDTH,
    height: Math.ceil(height - EXTRA_BOTTOM_PADDING),
    pageRanges: "1", // Ensures that only the first page is printed.
  });

  await browser.close();

  // Write the raw PDF first, then try to recompress it with ghostscript.
  // /ebook downsamples raster gradients to ~150dpi and re-flates streams
  // without dropping backgrounds, typically shaving 50-80% off the file.
  const tmpOut = "public/curriculum.tmp.pdf";
  const finalOut = "public/curriculum.pdf";
  fs.writeFileSync(tmpOut, pdf);

  try {
    execSync(
      `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${finalOut} ${tmpOut}`,
      { stdio: "inherit" },
    );
    fs.unlinkSync(tmpOut);
  } catch (err) {
    console.warn(
      "Ghostscript compression failed, using uncompressed PDF:",
      err.message,
    );
    fs.renameSync(tmpOut, finalOut);
  }
};

// Properly handle the async function
void getPdf();
