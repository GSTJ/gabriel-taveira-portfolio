const fs = require("fs");
const puppeteer = require("puppeteer");

const getPdf = async () => {
    const browser = await puppeteer.launch({
        headless: "new",
    });

    const page = await browser.newPage();
    await page.goto("https://www.gabrieltaveira.dev", { waitUntil: "networkidle0" });

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
        width: WEB_WIDTH,
        height: Math.ceil(height - EXTRA_BOTTOM_PADDING),
        pageRanges: "1", // Ensures that only the first page is printed.
    });

    await browser.close();

    // Save curriculum to disk
    await new Promise(resolve => fs.writeFile("public/curriculum.pdf", pdf, resolve));
};

getPdf();
