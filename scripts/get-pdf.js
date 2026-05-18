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

  // Measure the bottom of the last meaningful element on the page. Using
  // body.scrollHeight pulls in trailing margin/padding plus any decorative
  // overflow, which is what produces the long blank page at the end of the
  // PDF. The footer is the last semantic block, so we cap the export to its
  // bottom edge plus a small breathing margin.
  const WEB_WIDTH = 1200;
  const BOTTOM_MARGIN = 32;
  const height = await page.evaluate((margin) => {
    const candidates = [
      ".ws-footer",
      "#contact",
      "footer",
      "main",
    ];
    let bottom = 0;
    for (const sel of candidates) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const elBottom = rect.bottom + window.scrollY;
      if (elBottom > bottom) bottom = elBottom;
    }
    if (!bottom) bottom = document.body.scrollHeight;
    return Math.ceil(bottom + margin);
  }, BOTTOM_MARGIN);

  const pdf = await page.pdf({
    printBackground: true,
    waitForFonts: true,
    width: WEB_WIDTH,
    height,
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
    // /ebook keeps the warm gradients legible while halving the raster cost.
    // We override the image resolutions explicitly (~150dpi color) so the
    // hero glow doesn't band, plus turn on duplicate-image detection and
    // font subsetting for additional savings.
    execSync(
      `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook \
        -dDetectDuplicateImages=true -dCompressFonts=true -dSubsetFonts=true \
        -dColorImageDownsampleType=/Bicubic -dColorImageResolution=150 \
        -dGrayImageDownsampleType=/Bicubic -dGrayImageResolution=150 \
        -dMonoImageDownsampleType=/Bicubic -dMonoImageResolution=300 \
        -dAutoFilterColorImages=false -dColorImageFilter=/DCTEncode \
        -dAutoFilterGrayImages=false -dGrayImageFilter=/DCTEncode \
        -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${finalOut} ${tmpOut}`,
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
