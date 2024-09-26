import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type CreatePlanPayload,
  type CreateSubscriptionPayload,
  Interval,
  PaystackClient,
  PaystackClientError,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { AxiosError, HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";
import { generateRandomString } from "./utils.ts";

describe("PaystackClient.subscriptions", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.subscriptions.create", async () => {
    const planPayload: CreatePlanPayload = {
      name: `paystack sdk test plan - ${generateRandomString(5)}`,
      amount: 50_000_000,
      interval: Interval.MONTHLY,
    };
    const planResponse = await client.plans.create(planPayload);
    type DataOfInterest = { planCode: string };
    const planData = planResponse.data as DataOfInterest;
    const payload: CreateSubscriptionPayload = {
      customer: "CUS_73cb3biedlkbe4a",
      plan: planData.planCode,
    };
    const response = await client.subscriptions.create(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Subscription successfully created");
  });

  it("PaystackClient.subscriptions.getSubscriptions", async () => {
    const response = await client.subscriptions.getSubscriptions({
      perPage: 2,
    });
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Subscriptions retrieved");
  });

  it("PaystackClient.subscriptions.getSubscription", async () => {
    const response = await client.subscriptions.getSubscription(
      "SUB_bbd8ws1ypay28cg",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Subscription retrieved successfully");
  });

  it("PaystackClient.subscriptions.enable", async () => {
    const err = await assertRejects(() =>
      client.subscriptions.enable("SUB_ievha8l1igtpuy1", "5qzqh94hzndycwu")
    );
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
      "Subscription with code not found or already active",
    );
    assertEquals(data.type, "validation_error");
    assertEquals(data.code, "not_found");
  });

  it("PaystackClient.subscriptions.disable", async () => {
    const err = await assertRejects(() =>
      client.subscriptions.disable("SUB_28fg2bcaqhg73l0", "ozmiw6tukx4x31m")
    );
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
      "Subscription with code not found or already inactive",
    );
    assertEquals(data.type, "validation_error");
    assertEquals(data.code, "not_found");
  });

  it("PaystackClient.subscriptions.getUpdateLink", async () => {
    const response = await client.subscriptions.getUpdateLink(
      "SUB_r2aqxnxzob1vvlf",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Link generated");
  });

  it.skip("PaystackClient.subscriptions.sendUpdateLink", async () => {
    // While most of the tests are fragile, this test fails after first
    // success pass within 24hrs with a message of "Email has been sent in the last 24 hours"
    // and a http status code of 429
    const response = await client.subscriptions.sendUpdateLink(
      "SUB_r2aqxnxzob1vvlf",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Email successfully sent");
  });
});
