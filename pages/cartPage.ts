import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly productName: Locator;
  readonly productQuantity: Locator;
  readonly checkoutBtn: Locator;
  constructor(private page: Page) {
    this.productName = this.page.locator(".inventory_item_name");
    this.productQuantity = this.page.locator(".cart_quantity");
    this.checkoutBtn = this.page.getByRole("button", { name: /Checkout/ });
  }
  //properties
  get url() {
    return "/cart.html";
  }
  //methods
  async getProductList() {
    const map = new Map<string, string>();
    const productNames = await this.productName.all();
    for (const [index, el] of productNames.entries()) {
      const name = await el.textContent();
      const qty = await this.productQuantity.nth(index).textContent();
      map.set(name!, qty!);
    }
    return map;
  }
}
