const puppeteer = require("puppeteer");
const GIFEncoder = require("gif-encoder");
const fs = require("fs");
const getPixels = require("get-pixels");
const path = require("path");
const filename = path.join(__dirname, "mygif.gif");

(async () => {
  const encoder = new GIFEncoder(800, 600);
  const file = fs.createWriteStream(filename);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  encoder
    .setFrameRate(60)
    .pipe(file)
    .setQuality(40)
    .setDelay(500)
    .writeHeader()
    .setRepeat(0);
  await page.setViewport({ width: 800, height: 600 });
  await page.goto("https://www.gabrieltaveira.dev/");

  for (let i = 0; i < 60; i++) {
    await page.screenshot({ path: `${i}.png` });
    await page.evaluate(() => window.scrollBy(0, 100));
  }

  await browser.close();

  let listOfPNGs = fs
    .readdirSync(".")
    .filter((a) => a.endsWith(".png"))
    .sort((a, b) => parseInt(a) - parseInt(b));

  addToGif(listOfPNGs);
})();

const addToGif = (images, counter = 0) => {
  getPixels(images[counter], (err, pixels) => {
    encoder.addFrame(pixels.data);
    if (++counter < images.length) addToGif(images, counter);
    else {
      encoder.finish();
      cleanUp(images, (err) => {
        if (err) console.error(err);
        else console.log("Gif created!");
        process.exit(0);
      });
    }
  });
};

const cleanUp = (listOfPNGs, callback) => {
  listOfPNGs.forEach((filepath) => fs.unlink(filepath, callback));
};
