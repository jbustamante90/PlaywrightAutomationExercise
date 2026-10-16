import { Page, Locator } from "@playwright/test";

export class OverviewPage {
  readonly finishBtn: Locator;
  constructor(private page: Page) {
    this.finishBtn = this.page.getByRole("button", { name: /Finish/ });
  }
  //properties
  get url() {
    return "/checkout-step-two.html";
  }
  //methods
}
