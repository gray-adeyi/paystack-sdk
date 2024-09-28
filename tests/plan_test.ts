import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type CreatePlanPayload,
  Interval,
  PaystackClient,
  type UpdatePlanPayload,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";

describe("PaystackClient.plan", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.plan.create", async () => {
    const payload: CreatePlanPayload = {
      name: "@gray-adeyi/paystack-sdk Test Plan",
      amount: 2_000_000,
      interval: Interval.MONTHLY,
    };
    const response = await client.plans.create(payload);
    assertEquals(response.statusCode, HttpStatusCode.Created);
    assertEquals(response.message, "Plan created");
  });

  it("PaystackClient.plan.getPlans", async () => {
    const response = await client.plans.getPlans({ perPage: 2 });
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Plans retrieved");
  });

  it("PaystackClient.plan.getPlan", async () => {
    const response = await client.plans.getPlan("PLN_uwqsi04fu3xcmwb");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Plan retrieved");
  });

  it("PaystackClient.plan.update", async () => {
    const payload: UpdatePlanPayload = {
      amount: 300_000_000,
    };
    const response = await client.plans.update("PLN_uwqsi04fu3xcmwb", payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
  });
});
