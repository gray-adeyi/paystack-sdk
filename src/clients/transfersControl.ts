import type { Reason } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";
import type { PaystackResponse } from "../types/global.ts";

/**
 * TransferControlClient provides methods lets you interface with Paystack's
 * Transfer Control API which allows you to manage settings of your transfers.
 * https://paystack.com/docs/api/transfer-control/
 */
export default class TransferControlClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a TransferControlClient
   *
   * @param secretKey - Your paystack integration secret key.
   * @param client - A custom rest client to use for making api calls to paystack's instead
   * of creating a new one with the secretKey
   */
  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  /**
   * Fetch the available balance on your integration
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  checkBalance(): Promise<PaystackResponse> {
    return this.client.call("/balance", HTTPMethod.GET);
  }

  /**
   * Fetch all pay-ins and pay-outs that occured on your integration
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  getBalanceLedger(): Promise<PaystackResponse> {
    return this.client.call("/balance/ledger", HTTPMethod.GET);
  }

  /**
   * Generates a new OTP and sends to customer in the event they are having trouble receiving one.
   *
   * @param transferCode : Transfer code
   * @param reason :  Any value from the reason enum
   * @returns A promise containing a {@link PaystackResponse}
   */
  resendOtp(transferCode: string, reason: Reason): Promise<PaystackResponse> {
    return this.client.call("/transfer/resend_otp", HTTPMethod.POST, {
      transferCode,
      reason,
    });
  }

  /**
   * This is used in the event that you want to be able to complete transfers
   * programmatically without use of OTPs. No arguments required. You will get
   * an OTP to complete the request
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  disableOtp(): Promise<PaystackResponse> {
    return this.client.call("/transfer/disable_otp", HTTPMethod.POST);
  }

  /**
   * Finalize the request to disable OTP on your transfers.
   *
   * @param otp : One time password
   * @returns A promise containing a {@link PaystackResponse}
   */
  finalizeDisableOtp(otp: string): Promise<PaystackResponse> {
    return this.client.call("/transfer/disable_otp_finalize", HTTPMethod.POST, {
      otp,
    });
  }

  /**
   * In the event that a customer wants to stop being able to complete transfers
   * programmatically, this endpoint helps turn OTP requirement back on. No
   * arguments required.
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  enableOtp(): Promise<PaystackResponse> {
    return this.client.call("/transfer/enable_otp/", HTTPMethod.POST);
  }
}
