import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateRefundPayload,
  GetRefundsOptions,
} from "../types/clients/refund.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Refund } from "../types/models.ts";

/**
 * RefundClient provides methods that lets you interface with Paystack's
 * Refunds API which allows you to create and manage transaction refunds.
    https://paystack.com/docs/api/refund/
 */
export default class RefundClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a RefundClient
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
   * Initiate a refund on your integration
   *
   * @param payload : {@link CreateRefundPayload} is the data sent to paystack
   * to initiate a refund.
   * @returns A promise containing  a {@link PaystackResponse}
   */
  create(payload: CreateRefundPayload) {
    return this.client.call("/refund", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Refund>
    >;
  }

  /**
   * Fetch refunds available on your integration.
   *
   * @param options : {@link GetRefundsOptions} lets you customize the data that is
   * returned in the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getRefunds(options?: GetRefundsOptions) {
    return this.client.call(
      "/refund",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Refund[]>>;
  }

  /**
   * Get details of a refund on your integration.
   *
   * @param reference Identifier for transaction to be refunded
   * @returns A promise containing a {@link PaystackResponse}
   */
  getRefund(reference: string) {
    return this.client.call(`/refund/${reference}`, HTTPMethod.GET) as Promise<
      PaystackResponse<Refund>
    >;
  }
}
