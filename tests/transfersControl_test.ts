import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient, PaystackClientError, Reason } from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { AxiosError, HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";

describe("PaystackClient.transfersControl", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient()
  });

  it("PaystackClient.transferControl.checkBalance",async () => {
    const response = await client.transferControl.checkBalance()
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Balances retrieved')
  });

  it("PaystackClient.transferControl.getBalanceLedger", async () => {
    const response = await client.transferControl.getBalanceLedger()
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'Balance ledger retrieved')
  });

  it("PaystackClient.transferControl.resendOtp", async () => {
    const response = await client.transferControl.resendOtp('TRF_vsyqdmlzble3uii', Reason.DISABLE_OTP)
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'OTP has been resent')
  });

  it("PaystackClient.transferControl.disableOtp", async () => {
    const response = await client.transferControl.disableOtp()
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'OTP has been sent to mobile number ending with 9831 and to email a******@g******.com')
  });

  it("PaystackClient.transferControl.finalizeDisableOtp", async () => {
    const err = await assertRejects(() => client.transferControl.finalizeDisableOtp('123456'))
    assertInstanceOf(err, PaystackClientError)
    type DataOfInterest = {status: boolean; message: string; type: string; code: string}
    const data = (err.wrappedError as AxiosError).response?.data as DataOfInterest
    assertEquals(data.status, false)
    assertEquals(data.message, 'OTP could not be verified')
    assertEquals(data.type, 'api_error')
    assertEquals(data.code, 'unknown')
  });

  it("PaystackClient.transferControl.enableOtp",async () => {
    const response = await client.transferControl.enableOtp()
    assertEquals(response.statusCode, HttpStatusCode.Ok)
    assertEquals(response.message, 'OTP requirement for transfers has been enabled')
  });
});
