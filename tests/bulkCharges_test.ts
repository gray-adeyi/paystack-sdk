import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { BulkChargeInstruction } from "../src/types/clients/bulkCharge.ts";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";

describe("PaystackClient.bulkCharges", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.bulkCharges.initiate", async () => {
    const payload: BulkChargeInstruction[] = [{
      authorization: "AUTH_w1renosr9o",
      amount: 1000,
      reference: "qwerty",
    }];
    const response = await client.bulkCharges.initiate(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Charges have been queued");
  });

  it("PaystackClient.bulkCharges.getBatches", async () => {
    const response = await client.bulkCharges.getBatches();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Bulk charges retrieved");
  });

  it("PaystackClient.bulkCharges.getBatch", async () => {
    const response = await client.bulkCharges.getBatch("BCH_u5wt90cm016uy1b");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Bulk charge retrieved");
  });

  it("PaystackClient.bulkCharges.getChargesInBatch", async () => {
    const response = await client.bulkCharges.getChargesInBatch(
      "BCH_u5wt90cm016uy1b",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
  });

  it("PaystackClient.bulkCharges.pauseBatch", async () => {
    const payload: BulkChargeInstruction[] = [{
      authorization: "AUTH_w1renosr9o",
      amount: 1000,
      reference: "qwerty",
    }];
    const createResponse = await client.bulkCharges.initiate(payload);
    assertEquals(createResponse.statusCode, HttpStatusCode.Ok);
    type DataOfInterest = { batchCode: string };
    const response = await client.bulkCharges.pauseBatch(
      (createResponse.data as DataOfInterest).batchCode,
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Bulk charge batch has been paused");
  });

  it("PaystackClient.bulkCharges.resumeBatch", async () => {
    const payload: BulkChargeInstruction[] = [{
      authorization: "AUTH_w1renosr9o",
      amount: 1000,
      reference: "qwerty",
    }];
    const createResponse = await client.bulkCharges.initiate(payload);
    assertEquals(createResponse.statusCode, HttpStatusCode.Ok);
    type DataOfInterest = { batchCode: string };
    const pauseResponse = await client.bulkCharges.pauseBatch(
      (createResponse.data as DataOfInterest).batchCode,
    );
    assertEquals(pauseResponse.statusCode, HttpStatusCode.Ok);
    const response = await client.bulkCharges.resumeBatch(
      (createResponse.data as DataOfInterest).batchCode,
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
  });
});
