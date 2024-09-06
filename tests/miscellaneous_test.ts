import { beforeAll, describe, it } from "@std/testing/bdd";
import { Country, PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";

describe("PaystackClient.miscellaneous", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.miscellaneous.getBanks",async () => {
    const response = await client.miscellaneous.getBanks({country: Country.COTE_D_IVOIRE})
    assertEquals(response.statusCode,200)
    assertEquals(response.status,true)
    assertEquals(response.message,'Banks retrieved')
  });

  it("PaystackClient.miscellaneous.getCountries", () => {});

  it("PaystackClient.miscellaneous.getStates", () => {});
});
