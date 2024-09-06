import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert";

describe("PaystackClient.applePay", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.applePay.registerDomain", () => {});
  it("PaystackClient.applePay.getDomains", async () => {
    const response = await client.applePay.getDomains();
    assertEquals(response.statusCode, 200);
    assertEquals(response.message, "Apple Pay registered domains retrieved");
    assertEquals(response.data, { domainNames: [] });
  });
  it("PaystackClient.applePay.unregisterDomain", () => {});
});
