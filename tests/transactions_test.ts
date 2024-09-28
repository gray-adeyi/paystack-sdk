import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  Currency,
  type InitializeTransactionPayload,
  type PartialDebitPayload,
  PaystackClient,
  PaystackClientError,
  type TransactionChargePayload,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { AxiosError, HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";

describe("PaystackClient.transactions", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.transactions.initialize", async () => {
    const payload: InitializeTransactionPayload = {
      amount: 500_000,
      email: "coyotedevmail@gmail.com",
    };
    const response = await client.transactions.initialize(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Authorization URL created");
  });

  it("PaystackClient.transactions.verify", async () => {
    const response = await client.transactions.verify("49peweufhx3zgls");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Verification successful");
  });

  it("PaystackClient.transactions.getTransactions", async () => {
    const response = await client.transactions.getTransactions({ perPage: 5 });
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Transactions retrieved");
  });

  it("PaystackClient.transactions.getTransaction", async () => {
    const response = await client.transactions.getTransaction("4206675182");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Transaction retrieved");
  });

  it("PaystackClient.transactions.charge", async () => {
    const payload: TransactionChargePayload = {
      amount: 100_000,
      email: "coyotedevmail@gmail.com",
      authorizationCode: "AUTH_w1renosr9o",
    };
    const response = await client.transactions.charge(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Charge attempted");
  });

  it("PaystackClient.transactions.getTimeline", async () => {
    const response = await client.transactions.getTimeline("4206675182");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Timeline retrieved");
  });

  it("PaystackClient.transactions.totals", async () => {
    const response = await client.transactions.totals();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Transaction totals");
  });

  it("PaystackClient.transactions.export", async () => {
    const response = await client.transactions.export();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Export successful");
  });

  it("PaystackClient.transactions.partialDebit", async () => {
    const payload: PartialDebitPayload = {
      authorizationCode: "AUTH_w1renosr9o",
      currency: Currency.NGN,
      amount: 50_000_000,
      email: "coyotedevmail@gmail.com",
      atLeast: 10_000,
    };
    const err = await assertRejects(() =>
      client.transactions.partialDebit(payload)
    );
    type DataOfInterest = {
      status: boolean;
      message: string;
      type: string;
      code: string;
    };
    assertInstanceOf(err, PaystackClientError);
    const data = (err.wrappedError as AxiosError).response
      ?.data as DataOfInterest;
    assertEquals(data.status, false);
    assertEquals(data.message, "merchant is not enabled for Partial Debit");
    assertEquals(data.type, "api_error");
    assertEquals(data.code, "unknown");
  });
});
