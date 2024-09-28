import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreatePaymentRequestPayload,
  GetPaymentRequestsOptions,
  UpdatePaymentRequestPayload,
} from "../types/clients/paymentRequest.ts";
import type { PaystackResponse } from "../types/global.ts";

/**
 * PaymentRequestClient provides method that lets you interface with Paystack's
 * Payment Requests API which allows you to manage requests for payment of
 * goods and services. https://paystack.com/docs/api/payment-request/
 */
export default class PaymentRequestClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a PaymentRequestClient
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
   * Create a payment request for a transaction on your integration
   *
   * @param payload : {@link CreatePaymentRequestPayload} is the data sent to paystack
   * to create a payment request.
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: CreatePaymentRequestPayload): Promise<PaystackResponse> {
    return this.client.call("/paymentrequest", HTTPMethod.POST, payload);
  }

  /**
   * Fetches the payment requests available on your integration.
   *
   * @param options {@link GetPaymentRequestsOptions} lets you customize the data
   * returned in the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getPaymentRequests(
    options?: GetPaymentRequestsOptions,
  ): Promise<PaystackResponse> {
    return this.client.call("/paymentrequest", HTTPMethod.GET, null, options);
  }

  /**
   * Get details of a payment request on your integration
   *
   * @param idOrCode : The payment request ID or code you want to fetch
   * @returns  A promise containing a {@link PaystackResponse}
   */
  getPaymentRequest(idOrCode: string): Promise<PaystackResponse> {
    return this.client.call(`/paymentrequest/${idOrCode}`, HTTPMethod.GET);
  }

  /**
   * Verify details of a payment request on your integration.
   *
   * @param idOrCode : The payment request ID or code
   * @returns A promise containing a {@link PaystackResponse}
   */
  verify(idOrCode: string): Promise<PaystackResponse> {
    return this.client.call(
      `/paymentrequest/verify/${idOrCode}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Send notification of a payment request to your customers
   *
   * @param idOrCode : The payment request ID or code
   * @returns A promise containing a {@link PaystackResponse}
   */
  sendNotification(idOrCode: string): Promise<PaystackResponse> {
    return this.client.call(
      `/paymentrequest/notify/${idOrCode}`,
      HTTPMethod.POST,
    );
  }

  /**
   * Get payment requests metric
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTotal(): Promise<PaystackResponse> {
    return this.client.call("/paymentrequest/totals", HTTPMethod.GET);
  }

  /**
   * Finalize a draft payment request
   *
   * @param idOrCode : The payment request ID or code
   * @returns A promise containing a {@link PaystackResponse}
   */
  finalize(idOrCode: string): Promise<PaystackResponse> {
    return this.client.call(
      `/paymentrequest/finalize/${idOrCode}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Update the payment request details on your integration
   *
   * @param idOrCode : The payment request ID or code
   * @param payload : {@link UpdatePaymentRequestPayload} is the data sent to paystack
   * to update the payment request.
   * @returns A promise containing a {@link PaystackResponse}
   */
  update(
    idOrCode: string,
    payload: UpdatePaymentRequestPayload,
  ): Promise<PaystackResponse> {
    return this.client.call(
      `/paymentrequest/${idOrCode}`,
      HTTPMethod.PUT,
      payload,
    );
  }

  /**
   * Used to archive a payment request. A payment
   * request will no longer be fetched on list or returned on verify.
   *
   * @param idOrCode : The payment request ID or code
   * @returns A promise containing a {@link PaystackResponse}
   */
  archive(idOrCode: string): Promise<PaystackResponse> {
    return this.client.call(
      `/paymentrequest/archive/${idOrCode}`,
      HTTPMethod.POST,
    );
  }
}
