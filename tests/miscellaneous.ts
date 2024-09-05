import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.miscellaneous", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.miscellaneous.getBanks", () => {});

  it("PaystackClient.miscellaneous.getCountries", () => {});

  it("PaystackClient.miscellaneous.getStates", () => {});
});
