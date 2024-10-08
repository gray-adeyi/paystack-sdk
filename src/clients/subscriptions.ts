import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateSubscriptionPayload,
  GetSubscriptionsOptions,
} from "../types/clients/subscriptions.ts";
import type { PaystackResponse } from "../types/global.ts";

/**
 * SubscriptionClient provides methods that lets you interface with Paystack's
 * Subscriptions API allows you to create and manage recurring
 * payment on your integration.
 * https://paystack.com/docs/api/subscription/
 */
export default class SubscriptionClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a SubscriptionClient
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
   * Create a subscription on your integration.
   *
   * @param payload : {@link CreateSubscriptionPayload} is the data sent to paystack
   * to create a subscription
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: CreateSubscriptionPayload): Promise<PaystackResponse> {
    return this.client.call("/subscription", HTTPMethod.POST, payload);
  }

  /**
   * Fetch subscriptions available on your integration.
   *
   * @param options: {@link GetSubscriptionsOptions} lets you customize the data
   * that is returned in the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getSubscriptions(
    options?: GetSubscriptionsOptions,
  ): Promise<PaystackResponse> {
    return this.client.call("/subscription", HTTPMethod.GET, null, options);
  }

  /**
   * Fetch details of a subscription on your integration.
   *
   * @param idOrCode: The subscription ``ID`` or ``code`` you want to fetch
   * @returns A promise containing a {@link PaystackResponse}
   */
  getSubscription(idOrCode: string): Promise<PaystackResponse> {
    return this.client.call(`/subscription/${idOrCode}`, HTTPMethod.GET);
  }

  /**
   * Enable a subscription on your integration
   *
   * @param code: Subscription code
   * @param token: Email token
   * @returns A promise containing a {@link PaystackResponse}
   */
  enable(code: string, token: string): Promise<PaystackResponse> {
    return this.client.call("/subscription/enable", HTTPMethod.POST, {
      code,
      token,
    });
  }

  /**
   * Disable a subscription on your integration
   *
   * @param code: Subscription code
   * @param token: Email token
   * @returns A promise containing a {@link PaystackResponse}
   */
  disable(code: string, token: string): Promise<PaystackResponse> {
    return this.client.call("/subscription/disable", HTTPMethod.POST, {
      code,
      token,
    });
  }

  /**
   * Generate a link for updating the card on a subscription
   *
   * @param code: Subscription code
   * @returns A promise containing a {@link PaystackResponse}
   */
  getUpdateLink(code: string): Promise<PaystackResponse> {
    return this.client.call(
      `/subscription/${code}/manage/link`,
      HTTPMethod.GET,
    );
  }

  /**
   * Email a customer a link for updating the card on their subscription
   *
   * @param code : Subscription code
   * @returns A promise containing a {@link PaystackResponse}
   */
  sendUpdateLink(code: string): Promise<PaystackResponse> {
    return this.client.call(
      `/subscription/${code}/manage/email/`,
      HTTPMethod.POST,
    );
  }
}
