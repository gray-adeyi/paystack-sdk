import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";

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

  it.only("PaystackClient.disputes.getDispute", async () => {});

  it("PaystackClient.disputes.getTransactionDisputes", () => {});

  it("PaystackClient.disputes.updateDispute", () => {});

  it("PaystackClient.disputes.addEvidence", () => {});

  it("PaystackClient.disputes.getUploadUrl", () => {});

  it("PaystackClient.disputes.resolveDispute", () => {});

  it("PaystackClient.disputes.exportDisputes", () => {});
});
