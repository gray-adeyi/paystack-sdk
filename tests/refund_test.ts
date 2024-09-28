import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type CreateRefundPayload,
  PaystackClient,
  PaystackClientError,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { AxiosError, HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";

describe("PaystackClient.refund", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.refund.create", async () => {
    const payload: CreateRefundPayload = { transaction: "4206675182" };
    const err = await assertRejects(() => client.refunds.create(payload));
    assertInstanceOf(err, PaystackClientError);
    type DataOfInterest = {
      status: boolean;
      message: string;
      type: string;
      code: string;
    };
    const data = (err.wrappedError as AxiosError).response
      ?.data as DataOfInterest;
    assertEquals(data.status, false);
    assertEquals(data.message, "Transaction has been fully reversed");
    assertEquals(data.type, "api_error");
    assertEquals(data.code, "transaction_reversed");
  });

  it("PaystackClient.refund.getRefunds", async () => {
    const response = await client.refunds.getRefunds({ perPage: 2 });
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Refunds retrieved");
  });

  it("PaystackClient.refund.getRefund", async () => {
    const response = await client.refunds.getRefund("12851478");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Refund retrieved");
  });
});
