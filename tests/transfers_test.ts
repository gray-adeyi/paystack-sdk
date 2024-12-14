import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type InitiateTransferPayload,
  PaystackClient,
  PaystackClientError,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { AxiosError, HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";

describe("PaystackClient.transfers", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.transfers.initiate", async () => {
    // Registered business account required to test TransferClient correctly.
    const payload: InitiateTransferPayload = {
      amount: 10_000,
      recipient: "RCP_1l58m5unz4028z5",
      source: "balance",
    };
    const err = await assertRejects(() => client.transfers.initiate(payload));
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
    assertEquals(
      data.message,
      "You cannot initiate third party payouts as a starter business",
    );
    assertEquals(data.type, "api_error");
    assertEquals(data.code, "transfer_unavailable");
  });

  it.skip("PaystackClient.transfers.finalize", async () => {});

  it.skip("PaystackClient.transfers.bulkTransfer", async () => {});

  it("PaystackClient.transfers.getTransfers", async () => {
    const response = await client.transfers.getTransfers();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Transfers retrieved");
  });

  it.skip("PaystackClient.transfers.getTransfer", async () => {});

  it.skip("PaystackClient.transfers.verify", async () => {});
});
