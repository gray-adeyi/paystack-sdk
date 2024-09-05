import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.plan", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.plan.create", () => {});

  it("PaystackClient.plan.getplans", () => {});

  it("PaystackClient.plan.getplan", () => {});

  it("PaystackClient.plan.update", () => {});
});
