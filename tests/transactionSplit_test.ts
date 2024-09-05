import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.transactionSplit", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.transactionSplit.create", () => {});

  it("PaystackClient.transactionSplit.getSplits", () => {});

  it("PaystackClient.transactionSplit.getSplit", () => {});

  it("PaystackClient.transactionSplit.update", () => {});

  it("PaystackClient.transactionSplit.addOrUpdate", () => {});

  it("PaystackClient.transactionSplit.remove", () => {});
});
