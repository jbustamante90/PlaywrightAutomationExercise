import { test as base, expect } from "@playwright/test";
import {
  LoginPage,
  CartPage,
  InventoryPage,
  CheckoutPage,
  ConfirmationPage,
  OverviewPage,
} from "../pages";
import { AuthApi, BookingApi } from "../api";

type Fixtures = {
  pages: {
    loginPage: LoginPage;
    cartPage: CartPage;
    inventoryPage: InventoryPage;
    checkoutPage: CheckoutPage;
    overviewPage: OverviewPage;
    confiirmationPage: ConfirmationPage;
  };
  apis: { auth: AuthApi; booking: BookingApi };
};

export const test = base.extend<Fixtures>({
  pages: async ({ page }, use) => {
    await use({
      loginPage: new LoginPage(page),
      cartPage: new CartPage(page),
      inventoryPage: new InventoryPage(page),
      checkoutPage: new CheckoutPage(page),
      overviewPage: new OverviewPage(page),
      confiirmationPage: new ConfirmationPage(page),
    });
  },
  apis: async ({ request }, use) => {
    await use({
      auth: new AuthApi(request),
      booking: new BookingApi(request),
    });
  },
});

export { expect } from "@playwright/test";
