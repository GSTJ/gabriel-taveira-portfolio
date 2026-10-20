const fs = require("fs");
const puppeteer = require("puppeteer");

/**
 * Prints `/en-US/resume`, the light single-column page built for this, as a
 * Letter-size PDF. It used to screenshot the dark portfolio into one giant
 * page and recompress it with Ghostscript, which left text an ATS read as
 * garbage. Print media, system fonts and no backgrounds keep it real text.
 */
const sourceUrl =
  process.env.PDF_SOURCE_URL ?? "https://www.gabrieltaveira.dev/en-US/resume";
const executablePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ?? process.env.CHROME_BIN;

const getPdf = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    ...(executablePath ? { executablePath } : {}),
    args: ["--disable-dev-shm-usage", "--no-first-run"],
  });

  const page = await browser.newPage();
  await page.goto(sourceUrl, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "Letter",
    preferCSSPageSize: true,
    printBackground: false,
    waitForFonts: true,
  });

  await browser.close();
  fs.writeFileSync("public/curriculum.pdf", pdf);
};

void getPdf();
