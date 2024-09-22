import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type ChargePayload,
  PaystackClient,
  type SubmitAddressPayload,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { AxiosError, HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";
import { PaystackClientError } from "../src/errors.ts";

describe("PaystackClient.charge", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.charge.charge", async () => {
    const payload: ChargePayload = {
      email: "johndoe@example.com",
      amount: 1000,
      bank: { code: "057", accountNumber: "0000000000" },
    };
    const response = await client.charge.charge(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Charge attempted");
  });

  it("PaystackClient.charge.submitPin", async () => {
    const response = await client.charge.submitPin("2345", "orhq92k1xv86s8w");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Charge attempted");
  });

  it("PaystackClient.charge.submitOtp", async () => {
    const response = await client.charge.submitOtp("234545", "orhq92k1xv86s8w");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Charge attempted");
  });

  it("PaystackClient.charge.submitPhone", async () => {
    const response = await client.charge.submitPhone(
      "07012345678",
      "orhq92k1xv86s8w",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Charge attempted");
  });

  it("PaystackClient.charge.submitBirthday", async () => {
    const response = await client.charge.submitBirthday(
      "1999-04-29",
      "orhq92k1xv86s8w",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Charge attempted");
  });

  it("PaystackClient.charge.submitAddress", async () => {
    const payload: SubmitAddressPayload = {
      address: "1 John Doe street",
      reference: "orhq92k1xv86s8w",
      city: "Iyana Ipaja",
      state: "Lagos",
      zipCode: "20101",
    };
    const err = await assertRejects(() => client.charge.submitAddress(payload));
    assertInstanceOf(err, PaystackClientError);
    assertEquals(err.status, HttpStatusCode.BadRequest);
    type DataOfInterest = {
      status: boolean;
      message: string;
      data: { status: string; message: string };
    };
    const response = (err.wrappedError as AxiosError).response
      ?.data as DataOfInterest;
    assertEquals(response.message, "Charge attempted");
    assertEquals(response.status, false);
    assertEquals(response.data.status, "failed");
    assertEquals(
      response.data.message,
      "Country not supported for Address Verification",
    );
  });

  it("PaystackClient.charge.checkPendingCharge", async () => {
    const response = await client.charge.checkPendingCharge("orhq92k1xv86s8w");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Reference check successful");
  });
});
