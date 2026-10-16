import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly invItem: Locator;
  readonly addToCrtBtn: Locator;
  readonly cartBtn: Locator;
  constructor(private page: Page) {
    this.invItem = this.page.locator(".inventory_item");
    this.addToCrtBtn = this.page.getByRole("button", { name: /Add to cart/ });
    this.cartBtn = this.page.getByLabel(/Cart,/);
  }

  //properties
  get url() {
    return "/inventory.html";
  }
  //methods
  async getItemIndex(item: Locator) {}

  async addItemToCart(name: string) {
    const item = this.invItem.filter({ hasText: name });
    const button = item.locator(this.addToCrtBtn);
    await button.click();
  }
}
