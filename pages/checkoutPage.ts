import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueBtn: Locator;
  constructor(private page: Page) {
    this.nameInput = this.page.getByPlaceholder(/First Name/);
    this.lastNameInput = this.page.getByPlaceholder(/Last Name/);
    this.zipCodeInput = this.page.getByPlaceholder(/Zip/);
    this.continueBtn = this.page.getByRole("button", { name: /Continue/ });
  }
  //methods
  async checkOut(name: string, lastName: string, zipCode: string) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueBtn.click();
  }
}
