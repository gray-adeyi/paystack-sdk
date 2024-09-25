import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient, PaystackClientError } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";

describe("PaystackClient.settlements", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.settlements.getSettlements", async () => {
    const response =await client.settlements.getSettlements({perPage: 1})
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, 'Settlements retrieved')
  });

  it("PaystackClient.settlements.getSettlementTransactions", async () => {
    const err =await assertRejects(() => client.settlements.getSettlementTransactions(''))
    assertInstanceOf(err, PaystackClientError)
    assertEquals(err.status, HttpStatusCode.NotFound)
  });
});
