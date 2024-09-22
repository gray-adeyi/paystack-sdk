import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";

describe("PaystackClient.integration", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.integration.getPaymentSessionTimeout", async () => {
    const response = await client.integration.getPaymentSessionTimeout();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Payment session timeout retrieved");
  });

  it("PaystackClient.integration.updatePaymentSessionTimeout", async () => {
    const response = await client.integration.updatePaymentSessionTimeout(60);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Payment session timeout updated");
  });
});
