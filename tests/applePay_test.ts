import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals, assertInstanceOf, assertRejects } from "@std/assert";
import { PaystackClientError } from "../src/errors.ts";
import { HttpStatusCode } from "axios";

describe("PaystackClient.applePay", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.applePay.registerDomain", async () => {
    const err = await assertRejects(async () => {
      await client.applePay.registerDomain("example.com");
    });
    assertInstanceOf(err, PaystackClientError);
    assertEquals(err.status, HttpStatusCode.BadRequest);
  });

  it("PaystackClient.applePay.getDomains", async () => {
    const response = await client.applePay.getDomains();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Apple Pay registered domains retrieved");
    assertEquals(response.data, { domainNames: [] });
  });

  it("PaystackClient.applePay.unregisterDomain", async () => {
    const err = await assertRejects(async () => {
      await client.applePay.unregisterDomain("example.com");
    });
    assertInstanceOf(err, PaystackClientError);
    assertEquals(err.status, HttpStatusCode.BadRequest);
  });
});
