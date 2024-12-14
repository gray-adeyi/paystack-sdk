import RestClient, { HTTPMethod } from "../restClient.ts";
import type { PaystackResponse } from "../types/global.ts";

/**
 * IntegrationClient provides methods that lets you interface with Paystack's
 * Integration API which allows you to manage some settings on your integration.
    https://paystack.com/docs/api/integration/
 */
export default class IntegrationClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a IntegrationClient
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
   * Fetch the payment session timeout on your integration
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
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an object with a `paymentSessionTimeout` property
   */
  getPaymentSessionTimeout(): Promise<
    PaystackResponse<{
      readonly paymentSessionTimeout: number;
    }>
  > {
    return this.client.call(
      "/integration/payment_session_timeout",
      HTTPMethod.GET,
    ) as Promise<
      PaystackResponse<{
        readonly paymentSessionTimeout: number;
      }>
    >;
  }

  /**
   * Update the payment session timeout on your integration
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
   * @param timeout - Time before stopping session (in seconds). Set to 0 to
   * cancel session timeouts
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an object with a `paymentSessionTimeout` property
   */
  updatePaymentSessionTimeout(timeout: number): Promise<
    PaystackResponse<{
      readonly paymentSessionTimeout: number;
    }>
  > {
    return this.client.call(
      "/integration/payment_session_timeout",
      HTTPMethod.PUT,
      { timeout },
    ) as Promise<
      PaystackResponse<{
        readonly paymentSessionTimeout: number;
      }>
    >;
  }
}
