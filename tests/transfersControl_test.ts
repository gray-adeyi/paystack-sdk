import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.transfersControl", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.transfersControl.checkBalance", () => {});

  it("PaystackClient.transfersControl.getBalanceLedger", () => {});

  it("PaystackClient.transfersControl.resendOtp", () => {});

  it("PaystackClient.transfersControl.disableOtp", () => {});

  it("PaystackClient.transfersControl.finalizeDisableOtp", () => {});

  it("PaystackClient.transfersControl.enableOtp", () => {});
});
