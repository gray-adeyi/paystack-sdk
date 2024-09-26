import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  Bearer,
  Currency,
  PaystackClient,
  type TransactionSplitCreatePayload,
  TxSplit,
  type UpdateTxSplitPayload,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";

describe("PaystackClient.transactionSplit", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.splits.create", async () => {
    const payload: TransactionSplitCreatePayload = {
      name: "Test split",
      type: TxSplit.PERCENTAGE,
      currency: Currency.NGN,
      subaccounts: [{ subaccount: "ACCT_iw34h1ss4p1luyd", share: 50 }, {
        subaccount: "ACCT_l6nz8ofjywrc66k",
        share: 50,
      }],
      bearerType: Bearer.ACCOUNT,
    };
    const response = await client.splits.create(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Split created");
  });

  it("PaystackClient.splits.getSplits", async () => {
    const response = await client.splits.getSplits();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Split retrieved");
  });

  it("PaystackClient.splits.getSplit", async () => {
    const response = await client.splits.getSplit("2880355");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Split retrieved");
  });

  it("PaystackClient.splits.update", async () => {
    const payload: UpdateTxSplitPayload = { name: "Jigani Groups Splits" };
    const response = await client.splits.update("2880355", payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Split group updated");
  });

  it("PaystackClient.splits.addOrUpdate", async () => {
    const response = await client.splits.addOrUpdate(
      "2880355",
      "ACCT_iw34h1ss4p1luyd",
      30,
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Subaccount added");
  });

  it("PaystackClient.splits.remove", async () => {
    await client.splits.addOrUpdate("2880355", "ACCT_ypicscilcimszal", 10);
    const response = await client.splits.remove(
      "2880355",
      "ACCT_ypicscilcimszal",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Subaccount removed");
  });
});
