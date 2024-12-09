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
   * @returns A promise containing a {@link PaystackResponse}
   */
  getPaymentSessionTimeout() {
    return this.client.call(
      "/integration/payment_session_timeout",
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<{
      readonly paymentSessionTimeout: number;
    }>>;
  }

  /**
   * Update the payment session timeout on your integration
   *
   * @param timeout : Time before stopping session (in seconds). Set to 0 to
   * cancel session timeouts
   * @returns A promise containing a {@link PaystackResponse}
   */
  updatePaymentSessionTimeout(timeout: number) {
    return this.client.call(
      "/integration/payment_session_timeout",
      HTTPMethod.PUT,
      { timeout },
    ) as Promise<PaystackResponse<{
      readonly paymentSessionTimeout: number;
    }>>;
  }
}
