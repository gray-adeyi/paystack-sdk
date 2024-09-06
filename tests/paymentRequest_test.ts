import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.paymentRequest", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.paymentRequest.create", () => {});

  it("PaystackClient.paymentRequest.getPaymentRequests", () => {});

  it("PaystackClient.paymentRequest.getPaymentRequest", () => {});

  it("PaystackClient.paymentRequest.verify", () => {});

  it("PaystackClient.paymentRequest.sendNotification", () => {});

  it("PaystackClient.paymentRequest.getTotal", () => {});

  it("PaystackClient.paymentRequest.finalize", () => {});

  it("PaystackClient.paymentRequest.update", () => {});

  it("PaystackClient.paymentRequest.archive", () => {});
});
