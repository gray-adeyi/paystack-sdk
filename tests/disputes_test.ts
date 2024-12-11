import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";

// Insufficient data to test DisputeClient
describe("PaystackClient.disputes", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.disputes.getDisputes", async () => {
    const response = await client.disputes.getDisputes();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Disputes retrieved");
  });

  it.skip("PaystackClient.disputes.getDispute", async () => {});

  it.skip("PaystackClient.disputes.getTransactionDisputes", async () => {});

  it.skip("PaystackClient.disputes.updateDispute", async () => {});

  it.skip("PaystackClient.disputes.addEvidence", async () => {});

  it.skip("PaystackClient.disputes.getUploadUrl", async () => {});

  it.skip("PaystackClient.disputes.resolveDispute", async () => {});

  it.skip("PaystackClient.disputes.exportDisputes", async () => {});
});
