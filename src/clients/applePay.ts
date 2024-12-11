import RestClient, { HTTPMethod } from "../restClient.ts";
import type { GetDomainsOptions } from "../types/clients/applePay.ts";
import type { PaystackResponse } from "../types/global.ts";

import type { ApplePayDomains } from "../types/models.ts";

/**
 * ApplePayClient provides methods that lets you interface with Paystack's
 * ApplePay API which allows you to register your application's top-level domain or subdomain.
 * see https://paystack.com/docs/api/apple-pay/
 *
 * @remark This feature is available to businesses in all markets except South Africa.
 */
export default class ApplePayClient {
  private client: RestClient;

  /**
   * @constructor Instantiate an ApplePayClient
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
   * Register a top-level domain or subdomain for your Apple Pay integration.
   *
   * @remarks This feature is available to businesses in all markets except South Africa.
   * This method can only be called with one domain or subdomain at a time.
   *
   * @param domainName : Domain name to be registered.
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  registerDomain(domainName: string): Promise<PaystackResponse<undefined>> {
    return this.client.call("/apple-pay/domain", HTTPMethod.POST, {
      domainName,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Fetch all registered domains on your integration.
   *
   * @remarks This feature is available to businesses in all markets except South Africa.
   *
   * @param options : {@link GetDomainsOptions} lets you customize the data in the response to
   * be returned.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getDomains(
    options?: GetDomainsOptions,
  ): Promise<PaystackResponse<ApplePayDomains>> {
    return this.client.call(
      "/apple-pay/domain",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<ApplePayDomains>>;
  }

  /**
   * Unregister a top-level domain or subdomain previously used for Apple Pay integration.
   *
   * @remark This feature is available to businesses in all markets except South Africa.
   *
   * @param domainName : The domain name to be unregistered.
   * @returns A promise containing a {@link PaystackResponse}
   */
  unregisterDomain(domainName: string): Promise<PaystackResponse<undefined>> {
    return this.client.call("/apple-pay/domain", HTTPMethod.DELETE, {
      domainName,
    }) as Promise<PaystackResponse<undefined>>;
  }
}
