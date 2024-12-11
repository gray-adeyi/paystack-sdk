import RestClient, { HTTPMethod } from "../restClient.ts";
import type { ValidateAccountPayload } from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { CardBin } from "../types/models.ts";

/**
 * VerificationClient provides methods that lets you interface with Paystack's
 * Verification API which allows you to perform KYC processes.
    https://paystack.com/docs/api/verification/
 */
export default class VerificationClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a VerificationClient
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
   * Confirm an account belongs to the right customer
   *
   * @param accountNumber : Account number
   * @param bankCode : You can get the list of bank codes by calling
   * `PaystackClient.miscellaneous.getBanks` method.
   * @returns A promise containing a {@link PaystackResponse}
   */
  resolveAccountNumber(
    accountNumber: string,
    bankCode: string,
  ): Promise<
    PaystackResponse<{
      readonly accountNumber: string;
      readonly accountName: string;
    }>
  > {
    return this.client.call(
      `/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      HTTPMethod.GET,
    ) as Promise<
      PaystackResponse<{
        readonly accountNumber: string;
        readonly accountName: string;
      }>
    >;
  }

  /**
   * Confirm the authenticity of a customer's account number before sending money
   *
   * @param payload : {@link ValidateAccountPayload} is the data sent to paystack
   * to validate the account
   * @returns A promise containing a {@link PaystackResponse}
   */
  validateAccount(payload: ValidateAccountPayload): Promise<
    PaystackResponse<{
      readonly verified: boolean;
      readonly verificationMessage: string;
    }>
  > {
    return this.client.call(
      "/bank/validate",
      HTTPMethod.POST,
      payload,
    ) as Promise<
      PaystackResponse<{
        readonly verified: boolean;
        readonly verificationMessage: string;
      }>
    >;
  }

  /**
   * Get more information about a customer's card
   *
   * @param bin : First 6 characters of card
   * @returns  A promise containing a {@link PaystackResponse}
   */
  resolveCardBin(bin: string): Promise<
    PaystackResponse<CardBin>
  > {
    return this.client.call(`/decision/bin/${bin}`, HTTPMethod.GET) as Promise<
      PaystackResponse<CardBin>
    >;
  }
}
