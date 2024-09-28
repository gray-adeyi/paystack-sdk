import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

// An advanced account is needed to test DedicatedAccountClient
describe("PaystackClient.dedicatedAccounts", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient()
  });

  it.skip("PaystackClient.dedicatedAccounts.create", async () => {});

  it.skip("PaystackClient.dedicatedAccounts.assign", async () => {});

  it.skip("PaystackClient.dedicatedAccounts.getDedicatedAccounts",async () => {
  });

  it.skip("PaystackClient.dedicatedAccounts.getDedicatedAccount", async () => {});

  it.skip("PaystackClient.dedicatedAccounts.requery", async () => {});

  it.skip("PaystackClient.dedicatedAccounts.deactivate", async () => {});

  it.skip("PaystackClient.dedicatedAccounts.split", async () => {});

  it.skip("PaystackClient.dedicatedAccounts.removeSplit", async () => {});

  it.skip("PaystackClient.dedicatedAccounts.getProviders", async () => {});
});
