import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.customers", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.customers.create", () => {});

  it("PaystackClient.customers.getCustomers", () => {});

  it("PaystackClient.customers.getCustomer", () => {});

  it("PaystackClient.customers.update", () => {});

  it("PaystackClient.customers.validate", () => {});

  it("PaystackClient.customers.flag", () => {});

  it("PaystackClient.customers.deactivate", () => {});
});
