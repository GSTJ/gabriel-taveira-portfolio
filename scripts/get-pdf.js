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
      "--no-first-run",
      "--no-zygote",
      // Force the highest quality compositor settings — the warm radial
      // gradients in the hero/aurora layers band hard when Chrome falls
      // back to its software rasterizer at low DPI.
      "--force-color-profile=srgb",
      "--font-render-hinting=medium",
      "--disable-lcd-text",
    ],
  });

  const page = await browser.newPage();
  // 2× device scale doubles the underlying raster of every gradient/glow
  // before Puppeteer rasterizes it into the PDF, which kills banding on
  // the hero aurora and the pubs-feature glow.
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
  // Keep screen styles in the PDF — Chrome flips to `@media print` for
  // page.pdf() by default, which can disable background gradients on any
  // rule guarded by media queries.
  await page.emulateMediaType("screen");
  await page.goto("https://www.gabrieltaveira.com.br/en-US", {
    waitUntil: "networkidle0",
  });

  // Neutralize motion and screen-only texture for the static export:
  // one-shot entrance animations and scroll reveals must land at their
  // final visible state, and hover transitions must never leak through.
  //
  // Box-shadows with large blur radii rasterize as visible blocks in PDF
  // at print DPI (the soft shadow becomes a hard-edged rectangle in the
  // raster grid). Replacing them with `none` keeps the content but kills
  // the artifact halos.
  await page.addStyleTag({
    content: `
      /* Components marked .ws-pdf-hide are interactive-only (nav, form,
         language switcher, live clock, CTA buttons that don't make sense
         in a static export). Stripped before measuring height. */
      .ws-pdf-hide { display: none !important; }

      /* When the contact form is stripped the left column would sit in
         half the grid width. Reflow the contact grid to a single column
         so the heading and channel list fill the section properly. */
      .ws-contact-grid { grid-template-columns: 1fr !important; }

      .ws-toast,
      #ws-toast-root { display: none !important; }

      /* Kill every animation and transition: removing an animation snaps
         the element to its natural (visible) styles, so reveals and the
         register fill can't be caught mid-flight. */
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        box-shadow: none !important;
      }
      body.ws-motion .ws-anim { opacity: 1 !important; transform: none !important; }

      /* Don't drink toner: collapse the saturated material blocks to
         ruled boxes on linen; keep cognac accents only. */
      .ws-hero-spine, .ws-pubs-sunburst { display: none !important; }
      .ws-hero-inner { padding-left: 24px !important; }
      .ws-hero-stat, .ws-pubs-feature, .ws-pubs-card,
      .ws-now-section, .ws-contact, .ws-writing-callout-cta {
        background: #efe9dc !important; color: #2a1f16 !important;
        border: 1px solid #2a1f16 !important;
      }
      .ws-pubs-feature *, .ws-now-section *, .ws-contact *,
      .ws-hero-stat * { color: #2a1f16 !important; border-color: #2a1f16 !important; }
      .ws-now-list, .ws-now-row, .ws-contact-channels, .ws-channel,
      .ws-contact-grid, .ws-footer { border-color: #2a1f16 !important; }
      .ws-work-row-spine { background: #2a1f16 !important; }
      .ws-awards-pennant path { fill: #2a1f16 !important; }
      .ws-name-cell-shared { color: #a4581d !important; }
      .ws-register-sq { background: #a4581d !important; }
      .ws-register-sq-ink { background: #2a1f16 !important; }
      body { border-top-width: 4px !important; }
    `,
  });

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
