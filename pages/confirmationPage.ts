import { Page, Locator } from "@playwright/test";

export class ConfirmationPage {
  readonly thaksTxt: Locator;
  constructor(private page: Page) {
    this.thaksTxt = this.page.locator(".complete-header");
  }
  //properties
  get url() {
    return "/checkout-complete.html";
  }

  //methods
}
