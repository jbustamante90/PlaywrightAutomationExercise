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
  expect(page).toHaveURL(/inventory/);

  //Add Items to cart
  await pages.inventoryPage.addItemToCart(product1);
  await pages.inventoryPage.addItemToCart(product2);
  await pages.inventoryPage.cartBtn.click();
  await page.waitForURL("/cart.html", { waitUntil: "networkidle" });

  //Validate product names and quantities in cart
  const cartMap = await pages.cartPage.getProductList();
  //names
  expect([...cartMap.keys()]).toEqual([product1, product2]);
  // quantities
  expect([...cartMap.values()]).toEqual(["1", "1"]);
  await pages.cartPage.checkoutBtn.click();
  await page.waitForURL("checkout-step-one.html", { waitUntil: "networkidle" });

  //Fill info and checkout
  await pages.checkoutPage.checkOut(name, lastName, zipCode);
  await page.waitForURL("checkout-step-two.html", { waitUntil: "networkidle" });
  await pages.overviewPage.finishBtn.click();
  await page.waitForURL("checkout-complete.html", { waitUntil: "networkidle" });

  //Validate Thank you text
  const expected = "Thank you for your order!";
  expect(pages.confiirmationPage.thaksTxt).toContainText(expected);
});
