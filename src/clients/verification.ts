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
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param accountNumber - Account number
   * @param bankCode - You can get the list of bank codes by calling
   * `PaystackClient.miscellaneous.getBanks` method.
   * @returns A promise that resolves to an object whose type is  {@link PaystackResponse}.
   * The data property of the object is another object with `accountNumber` and `accountName`
   * as its properties
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
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param payload - {@link ValidateAccountPayload} is the data sent to paystack
   * to validate the account
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object with `verified` and `verificationMessage`
   * as its properties
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
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param bin - First 6 characters of card
   * @returns  A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link CardBin}
   */
  resolveCardBin(bin: string): Promise<
    PaystackResponse<CardBin>
  > {
    return this.client.call(`/decision/bin/${bin}`, HTTPMethod.GET) as Promise<
      PaystackResponse<CardBin>
    >;
  }
}
