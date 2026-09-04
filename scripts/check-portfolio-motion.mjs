import assert from "node:assert/strict";

// Run with the connected browser tab on the English portfolio home.
export async function checkPortfolioMotion(tab) {
  await tab.playwright
    .getByRole("button", { name: "Pause motion", exact: true })
    .click();
  const play = tab.playwright.getByRole("button", {
    name: "Play motion",
    exact: true,
  });
  assert.equal(await play.getAttribute("aria-pressed"), "true");
  assert.equal(
    await tab.playwright
      .locator(".kinetic-object")
      .evaluate((element) => getComputedStyle(element).animationPlayState),
    "paused",
  );
  await play.click();
  assert.equal(
    await tab.playwright
      .getByRole("button", { name: "Pause motion", exact: true })
      .getAttribute("aria-pressed"),
    "false",
  );
  assert.equal(
    await tab.playwright
      .locator(".kinetic-object")
      .evaluate((element) => getComputedStyle(element).animationPlayState),
    "running",
  );
}
