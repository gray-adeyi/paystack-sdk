import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";

// A terminal is needed to test the TerminalClient
describe("PaystackClient.terminals", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient()
  });

  it.skip("PaystackClient.terminals.sendEvent", async () => {
  });

  it.skip("PaystackClient.terminals.getEventStatus", () => {});

  it.skip("PaystackClient.terminals.getTerminalStatus", () => {});

  it("PaystackClient.terminals.getTerminals", async() => {
    const response = await client.terminals.getTerminals()
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Terminals retrieved successfully')
  });

  it.skip("PaystackClient.terminals.getTerminal", () => {});

  it.skip("PaystackClient.terminals.updateTerminal", () => {});

  it.skip("PaystackClient.terminals.commissionTerminal", () => {});

  it.skip("PaystackClient.terminals.decommissionTerminal", () => {});
});
