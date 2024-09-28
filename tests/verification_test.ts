import { beforeAll, describe, it } from "@std/testing/bdd";
import { AccountType, Country, Document, PaystackClient, type ValidateAccountPayload } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";

describe("PaystackClient.verification", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient()
  });

  it("PaystackClient.verification.resolveAccountNumber", async () => {
    const response = await client.verification.resolveAccountNumber('5273681014', '214')
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Account number resolved')
  });

  it("PaystackClient.verification.validateAccount", async () => {
    const payload: ValidateAccountPayload = {
      accountName: 'Ann Bron',
      accountNumber: '0123456789',
      accountType: AccountType.PERSONAL,
      bankCode: '632005',
      countryCode: Country.SOUTH_AFRICA,
      documentType: Document.IDENTITY_NUMBER,
      documentNumber: '1234567890123'
    }
    const response = await client.verification.validateAccount(payload)
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Personal Account Verification attempted')
  });

  it("PaystackClient.verification.resolveCardBin", async () => {
    const response = await client.verification.resolveCardBin('539983')
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Bin resolved')
  });
});
