import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.bulkCharges", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.bulkCharges.initiate", () => {});

  it("PaystackClient.bulkCharges.getBatches", () => {});

  it("PaystackClient.bulkCharges.getBatch", () => {});

  it("PaystackClient.bulkCharges.getChargesInBatch", () => {});

  it("PaystackClient.bulkCharges.pauseBatch", () => {});

  it("PaystackClient.bulkCharges.resumeBatch", () => {});
});
