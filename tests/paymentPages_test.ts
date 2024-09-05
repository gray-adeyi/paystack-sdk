import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.paymentPages", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.paymentPages.create", () => {});

  it("PaystackClient.paymentPages.getPages", () => {});

  it("PaystackClient.paymentPages.getPage", () => {});

  it("PaystackClient.paymentPages.update", () => {});

  it("PaystackClient.paymentPages.checkSlugAvailable", () => {});

  it("PaystackClient.paymentPages.addProducts", () => {});
});
