import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateSubscriptionPayload,
  GetSubscriptionsOptions,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Subscription } from "../types/models.ts";

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
   * @param payload - {@link CreateSubscriptionPayload} is the data sent to paystack
   * to create a subscription
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Subscription}
   */
  create(
    payload: CreateSubscriptionPayload,
  ): Promise<PaystackResponse<Subscription>> {
    return this.client.call(
      "/subscription",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<Subscription>>;
  }

  /**
   * Fetch subscriptions available on your integration.
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
   * @param options - {@link GetSubscriptionsOptions} lets you customize the data
   * that is returned in the response.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Subscription}
   */
  getSubscriptions(
    options?: GetSubscriptionsOptions,
  ): Promise<PaystackResponse<Subscription>> {
    return this.client.call(
      "/subscription",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Subscription>>;
  }

  /**
   * Fetch details of a subscription on your integration.
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
   * @param idOrCode - The subscription ``ID`` or ``code`` you want to fetch
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Subscription}
   */
  getSubscription(idOrCode: string): Promise<PaystackResponse<Subscription>> {
    return this.client.call(
      `/subscription/${idOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Subscription>>;
  }

  /**
   * Enable a subscription on your integration
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
   * @param code - Subscription code
   * @param token - Email token
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  enable(code: string, token: string): Promise<PaystackResponse<undefined>> {
    return this.client.call("/subscription/enable", HTTPMethod.POST, {
      code,
      token,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Disable a subscription on your integration
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
   * @param code - Subscription code
   * @param token  Email token
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  disable(code: string, token: string): Promise<PaystackResponse<undefined>> {
    return this.client.call("/subscription/disable", HTTPMethod.POST, {
      code,
      token,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Generate a link for updating the card on a subscription
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
   * @param code - Subscription code
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object with `link` as it's property
   */
  getUpdateLink(code: string): Promise<
    PaystackResponse<{
      readonly link: string;
    }>
  > {
    return this.client.call(
      `/subscription/${code}/manage/link`,
      HTTPMethod.GET,
    ) as Promise<
      PaystackResponse<{
        readonly link: string;
      }>
    >;
  }

  /**
   * Email a customer a link for updating the card on their subscription
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
   * @param code - Subscription code
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  sendUpdateLink(code: string): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/subscription/${code}/manage/email/`,
      HTTPMethod.POST,
    ) as Promise<PaystackResponse<undefined>>;
  }
}
