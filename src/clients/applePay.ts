import RestClient, { HTTPMethod } from "../restClient.ts";
import type { GetDomainsOptions } from "../types/clients/applePay.ts";
import type { PaystackResponse } from "../types/global.ts";

import type { ApplePayDomains } from "../types/models.ts";

/**
 * ApplePayClient provides methods that lets you interface with Paystack's
 * Apple Pay API which allows you to register your application's top-level domain or subdomain.
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
   * @param client - A custom rest client to use for making api calls to paystack instead
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
   * @param domainName - Domain name to be registered.
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`.
   *
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
   * @param options - {@link GetDomainsOptions} lets you customize the data in the response to
   * be returned.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link ApplePayDomains}
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
   * @remarks This feature is available to businesses in all markets except South Africa.
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
   * @param domainName - The domain name to be unregistered.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  unregisterDomain(domainName: string): Promise<PaystackResponse<undefined>> {
    return this.client.call("/apple-pay/domain", HTTPMethod.DELETE, {
      domainName,
    }) as Promise<PaystackResponse<undefined>>;
  }
}
