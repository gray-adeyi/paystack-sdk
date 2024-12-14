import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type CreatePaymentRequestPayload,
  PaystackClient,
  PaystackClientError,
  type UpdatePaymentRequestPayload,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";

describe("PaystackClient.paymentRequest", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.paymentRequests.create", async () => {
    const payload: CreatePaymentRequestPayload = {
      customer: "CUS_x1hp1dli4mdo1v0",
      amount: 1000,
    };
    const response = await client.paymentRequests.create(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok),
      assertEquals(response.message, "Payment request created");
  });

  it("PaystackClient.paymentRequests.getPaymentRequests", async () => {
    const response = await client.paymentRequests.getPaymentRequests();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Payment requests retrieved");
  });

  it("PaystackClient.paymentRequests.getPaymentRequest", async () => {
    const response = await client.paymentRequests.getPaymentRequest(
      "PRQ_m0pqwkxih8teah1",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Payment request retrieved");
  });

  it("PaystackClient.paymentRequests.verify", async () => {
    const response = await client.paymentRequests.verify("PRQ_my1uk6vldrwuj2w");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Payment request retrieved");
  });

  it("PaystackClient.paymentRequests.sendNotification", async () => {
    const response = await client.paymentRequests.sendNotification(
      "PRQ_my1uk6vldrwuj2w",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Notification sent");
  });

  it("PaystackClient.paymentRequests.getTotal", async () => {
    const response = await client.paymentRequests.getTotal();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Payment request totals");
  });

  it("PaystackClient.paymentRequests.finalize", async () => {
    const createPayload: CreatePaymentRequestPayload = {
      customer: "CUS_x1hp1dli4mdo1v0",
      amount: 1000,
    };
    const createResponse = await client.paymentRequests.create(createPayload);
    assertEquals(createResponse.statusCode, HttpStatusCode.Ok);
    const err = await assertRejects(() =>
      client.paymentRequests.finalize(createResponse.data.requestCode)
    );
    assertInstanceOf(err, PaystackClientError);
    assertEquals(err.status, HttpStatusCode.NotFound);
  });

  it("PaystackClient.paymentRequests.update", async () => {
    const createPayload: CreatePaymentRequestPayload = {
      customer: "CUS_x1hp1dli4mdo1v0",
      amount: 1000,
    };
    const createResponse = await client.paymentRequests.create(createPayload);
    assertEquals(createResponse.statusCode, HttpStatusCode.Ok);
    const payload: UpdatePaymentRequestPayload = {
      customer: "CUS_x1hp1dli4mdo1v0",
      amount: 2_000_000,
    };
    const response = await client.paymentRequests.update(
      createResponse.data.requestCode,
      payload,
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Payment request updated");
  });

  it("PaystackClient.paymentRequests.archive", async () => {
    const createPayload: CreatePaymentRequestPayload = {
      customer: "CUS_x1hp1dli4mdo1v0",
      amount: 1000,
    };
    const createResponse = await client.paymentRequests.create(createPayload);
    assertEquals(createResponse.statusCode, HttpStatusCode.Ok);
    const response = await client.paymentRequests.archive(
      createResponse.data.requestCode,
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Payment request has been archived");
  });
});
