const fs = require("fs");
const puppeteer = require("puppeteer");

/**
 * Prints `/en-US/resume`, the light single-column page built for this, as a
 * Letter-size PDF. It used to screenshot the dark portfolio into one giant
 * page and recompress it with Ghostscript, which left text an ATS read as
 * garbage. Print media, static fonts and no backgrounds keep it real text.
 */
const sourceUrl =
  process.env.PDF_SOURCE_URL ?? "https://www.gabrieltaveira.dev/en-US/resume";
const executablePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ?? process.env.CHROME_BIN;

const INFO = {
  Title: "Gabriel Taveira, Resume",
  Author: "Gabriel Taveira",
  Subject:
    "Fractional CTO and engineering leader: architecture, teams, hiring and delivery for product companies",
  Keywords:
    "Fractional CTO, Engineering Leader, Engineering Manager, Technical Hiring, App Architecture, TypeScript, React, React Native, Expo, Next.js, Node.js, Swift",
};

/** A PDF text string: UTF-16BE with a byte order mark, as hex. */
const pdfString = (text) =>
  `<FEFF${Buffer.from(text, "utf16le").swap16().toString("hex").toUpperCase()}>`;

/**
 * Chrome writes only Title into the document info, whatever meta tags the
 * page has. This appends an incremental update (a new info dictionary, its
 * xref entry and a trailer pointing back at Chrome's) instead of rewriting
 * the file, so the tagged structure Chrome wrote stays byte for byte.
 */
const withInfo = (pdf) => {
  const tail = pdf.subarray(-1024).toString("latin1");
  const trailer = tail.slice(tail.lastIndexOf("trailer"));
  const size = Number(/\/Size (\d+)/.exec(trailer)?.[1]);
  const root = /\/Root (\d+ \d+ R)/.exec(trailer)?.[1];
  const prev = Number(/startxref\s+(\d+)/.exec(trailer)?.[1]);
  const created = /\/CreationDate \(([^)]*)\)/.exec(
    pdf.toString("latin1"),
  )?.[1];
  if (!size || !root || !prev) throw new Error("Unexpected PDF trailer");

  const entries = Object.entries(INFO).map(([k, v]) => `/${k} ${pdfString(v)}`);
  if (created) entries.push(`/CreationDate (${created})`);
  const object = `${size} 0 obj\n<<${entries.join("\n")}>>\nendobj\n`;
  const offset = pdf.length + 1;
  const update =
    `\n${object}xref\n${size} 1\n${String(offset).padStart(10, "0")} 00000 n \n` +
    `trailer\n<</Size ${size + 1}\n/Root ${root}\n/Info ${size} 0 R\n/Prev ${prev}>>\n` +
    `startxref\n${offset + object.length}\n%%EOF\n`;
  return Buffer.concat([pdf, Buffer.from(update, "latin1")]);
};

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
    tagged: true,
  });

  await browser.close();
  fs.writeFileSync("public/curriculum.pdf", withInfo(Buffer.from(pdf)));
};

void getPdf();
