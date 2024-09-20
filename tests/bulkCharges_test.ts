import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { BulkChargeInstruction } from "../src/types/clients/bulkCharge.ts";
import { assertRejects } from "@std/assert/rejects";
import { assertEquals } from "@std/assert/equals";
import { assertInstanceOf } from "@std/assert/instance-of";
import { PaystackClientError } from "../src/errors.ts";
import { AxiosError } from "axios";

describe("PaystackClient.bulkCharges", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.bulkCharges.initiate", async () => {
    const payload: BulkChargeInstruction[] = [{
      authorization: "",
      amount: 1000,
      reference: "qwerty",
    }];
    const err = await assertRejects(async () => {
      await client.bulkCharges.initiate(payload);
    });
    assertInstanceOf(err, PaystackClientError);
    assertEquals(err.status, 400);
  });

  it("PaystackClient.bulkCharges.getBatches", async () => {
    const response = await client.bulkCharges.getBatches();
    assertEquals(response.statusCode, 200);
    assertEquals(response.message, "Bulk charges retrieved");
  });

  it("PaystackClient.bulkCharges.getBatch", async () => {
    const response = await client.bulkCharges.getBatch("BCH_u5wt90cm016uy1b");
    assertEquals(response.statusCode, 200);
    assertEquals(response.message, "Bulk charge retrieved");
  });

  it("PaystackClient.bulkCharges.getChargesInBatch", async () => {
    const response = await client.bulkCharges.getChargesInBatch("BCH_u5wt90cm016uy1b");
    assertEquals(response.statusCode, 200);
  });

  it("PaystackClient.bulkCharges.pauseBatch", () => {});

  it("PaystackClient.bulkCharges.resumeBatch", () => {});
});
