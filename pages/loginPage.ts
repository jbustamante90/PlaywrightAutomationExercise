import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInput = this.page.getByPlaceholder(/Username/);
    this.passwordInput = this.page.getByPlaceholder(/Password/);
    this.loginBtn = this.page.getByRole("button", { name: /Login/ });
  }

  //methods
  async goTo() {
    await this.page.goto("https://www.saucedemo.com/", {
      waitUntil: "domcontentloaded",
    });
  }

  async login(user: string, password: string) {
    await this.userInput.fill(user);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
