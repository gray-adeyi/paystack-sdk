import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.transactions", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.transactions.initialize", () => {});

  it("PaystackClient.transactions.verify", () => {});

  it("PaystackClient.transactions.getTransactions", () => {});

  it("PaystackClient.transactions.getTransaction", () => {});

  it("PaystackClient.transactions.charge", () => {});

  it("PaystackClient.transactions.getTimeline", () => {});

  it("PaystackClient.transactions.totals", () => {});

  it("PaystackClient.transactions.export", () => {});

  it("PaystackClient.transactions.partialDebit", () => {});
});
