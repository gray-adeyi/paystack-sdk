import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.subscriptions", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.subscriptions.create", () => {});

  it("PaystackClient.subscriptions.getSubscriptions", () => {});

  it("PaystackClient.subscriptions.getSubscription", () => {});

  it("PaystackClient.subscriptions.enable", () => {});

  it("PaystackClient.subscriptions.disable", () => {});

  it("PaystackClient.subscriptions.getUpdateLink", () => {});

  it("PaystackClient.subscriptions.sendUpdateLink", () => {});
});
