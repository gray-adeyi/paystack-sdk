import { beforeAll, describe, it } from "@std/testing/bdd";
import {  PaystackClient, Schedule, type CreateSubAccountPayload, type UpdateSubAccountPayload } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";

describe("PaystackClient.subAccount", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient()
  });

  it("PaystackClient.subAccount.create",async () => {
    const payload: CreateSubAccountPayload = {
      businessName: 'Phunmy Stores',
      settlementBank: '214',
      accountNumber:'5273681014',
      percentageCharge: 2
    }
    const response = await client.subAccounts.create(payload)
    assertEquals(response.statusCode, HttpStatusCode.Created)
    assertEquals(response.message, 'Subaccount created')
  });

  it("PaystackClient.subAccount.getSubAccounts", async () => {
    const response = await client.subAccounts.getSubAccounts({perPage: 2})
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Subaccounts retrieved')
  });

  it("PaystackClient.subAccount.getSubAccount", async () => {
    const response = await client.subAccounts.getSubAccount('ACCT_l6nz8ofjywrc66k')
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Subaccount retrieved')
  });

  it("PaystackClient.subAccount.update",async () => {
    const payload: UpdateSubAccountPayload = {businessName: 'John Doe Stores',settlementSchedule: Schedule.MONTHLY}
    const response = await client.subAccounts.update('ACCT_iw34h1ss4p1luyd', payload)
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Subaccount updated')
  });
});
