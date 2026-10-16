import { test, expect } from "../fixtures/base";

const user = process.env.UI_USER!;
const password = process.env.UI_PASWORD!;

//product data
const product1 = "Sauce Labs Backpack";
const product2 = "Sauce Labs Fleece Jacket";

//user data
const name = "Jose";
const lastName = "Bustamante";
const zipCode = "99999";

test("UI Test", async ({ page, pages }) => {
  //Login
  await pages.loginPage.goTo();
  await pages.loginPage.login(user, password);
  await page.waitForURL(pages.inventoryPage.url, { waitUntil: "networkidle" });

  await page.pause();

  //Add Items to cart
  await pages.inventoryPage.addItemToCart(product1);
  await pages.inventoryPage.addItemToCart(product2);
  await pages.inventoryPage.cartBtn.click();
  await page.waitForURL(pages.cartPage.url, { waitUntil: "networkidle" });
  await pages.cartPage.checkoutBtn.waitFor({ state: "visible" });

  //Validate product names and quantities in cart
  const cartMap = await pages.cartPage.getProductList();
  //names
  expect([...cartMap.keys()]).toEqual([product1, product2]);
  // quantities
  expect([...cartMap.values()]).toEqual(["1", "1"]);
  await pages.cartPage.checkoutBtn.click();
  await page.waitForURL(pages.checkoutPage.url, { waitUntil: "networkidle" });

  //Fill info and checkout
  await pages.checkoutPage.checkOut(name, lastName, zipCode);
  await page.waitForURL(pages.overviewPage.url, { waitUntil: "networkidle" });
  await pages.overviewPage.finishBtn.click();
  await page.waitForURL(pages.confiirmationPage.url, {
    waitUntil: "networkidle",
  });

  //Validate Thank you text
  const expected = "Thank you for your order!";
  expect(pages.confiirmationPage.thaksTxt).toContainText(expected);
});
