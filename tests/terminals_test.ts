import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe("PaystackClient.terminals", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "./.env", export: true });
  });

  it("PaystackClient.terminals.sendEvent", () => {});

  it("PaystackClient.terminals.getEventStatus", () => {});

  it("PaystackClient.terminals.getTerminalStatus", () => {});

  it("PaystackClient.terminals.getTerminals", () => {});

  it("PaystackClient.terminals.getTerminal", () => {});

  it("PaystackClient.terminals.updateTerminal", () => {});

  it("PaystackClient.terminals.commissionTerminal", () => {});

  it("PaystackClient.terminals.decommissionTerminal", () => {});
});
