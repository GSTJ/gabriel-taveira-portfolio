const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

/**
 * Renders the share card for each locale into `public/og/<locale>.png`: the
 * hero's own headline, type and pen on paper, at 1200x630. A static PNG
 * because the card needs the self-hosted variable fonts, which next/og's
 * renderer can't read (it takes TTF/OTF/WOFF, no WOFF2, no variable axes).
 * Rerun after changing `hero.title` or `hero.status`.
 */
const root = path.join(__dirname, "..");
const font = (file) =>
  `url(data:font/woff2;base64,${fs
    .readFileSync(path.join(root, "src/app/fonts", file))
    .toString("base64")})`;
const executablePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ?? process.env.CHROME_BIN;

const escapeHtml = (text) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** `<me>` and `<pen>` from the locale string, the same tags the hero uses. */
const headline = (title) =>
  escapeHtml(title)
    .replace(/&lt;me&gt;(.*?)&lt;\/me&gt;/, '<span class="me">$1</span>')
    .replace(
      /&lt;pen&gt;(.*?)&lt;\/pen&gt;/,
      `<span class="pen">$1<svg viewBox="0 0 300 14" preserveAspectRatio="none"><path d="M3 9C70 4 150 3 297 6"/><path d="M40 12c60-4 140-5 220-3"/></svg></span>`,
    );

const html = ({ hero }) => `<!doctype html>
<style>
  @font-face { font-family: Bricolage; src: ${font("bricolage.woff2")}; font-weight: 300 700; font-stretch: 90% 100%; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; padding: 64px 72px 0; background: #f6f6f3; color: #191917;
    font-family: Bricolage; display: flex; flex-direction: column; }
  .head { display: flex; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid #d9d7cf;
    font-size: 24px; letter-spacing: -0.01em; color: #47463f; }
  .head b { font-weight: 520; color: #191917; }
  h1 { margin-top: auto; margin-bottom: 64px; max-width: 14em; font-size: 82px; line-height: 1.02;
    letter-spacing: -0.036em; font-weight: 380; font-stretch: 92%; }
  .me { display: block; font-weight: 640; }
  .pen { position: relative; white-space: nowrap; }
  .pen svg { position: absolute; left: 0; bottom: -0.16em; width: 100%; height: 0.28em; overflow: visible; }
  .pen path { fill: none; stroke: #2343c9; stroke-width: 4; stroke-linecap: round; vector-effect: non-scaling-stroke; }
</style>
<div class="head"><span><b>Gabriel Taveira</b> · ${escapeHtml(hero.status)}</span><span>gabrieltaveira.dev</span></div>
<h1>${headline(hero.title)}</h1>`;

const getOg = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    ...(executablePath ? { executablePath } : {}),
    args: ["--disable-dev-shm-usage", "--no-first-run"],
  });
  fs.mkdirSync(path.join(root, "public/og"), { recursive: true });

  await Promise.all(
    ["en-US", "pt-BR"].map(async (locale) => {
      const messages = JSON.parse(
        fs.readFileSync(path.join(root, `src/i18n/locales/${locale}.json`)),
      );
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 630 });
      await page.setContent(html(messages), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(root, `public/og/${locale}.png`),
      });
    }),
  );

  await browser.close();
};

void getOg();
