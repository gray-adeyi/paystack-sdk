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
   * @param payload - {@link CreateRefundPayload} is the data sent to paystack
   * to initiate a refund.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Refund}
   */
  create(payload: CreateRefundPayload): Promise<
    PaystackResponse<Refund>
  > {
    return this.client.call("/refund", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Refund>
    >;
  }

  /**
   * Fetch refunds available on your integration.
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
   * @param options - {@link GetRefundsOptions} lets you customize the data that is
   * returned in the response.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property is an array of objects whose type is {@link Refund}
   */
  getRefunds(options?: GetRefundsOptions): Promise<PaystackResponse<Refund[]>> {
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
   * @param reference - Identifier for transaction to be refunded
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Refund}
   */
  getRefund(reference: string): Promise<
    PaystackResponse<Refund>
  > {
    return this.client.call(`/refund/${reference}`, HTTPMethod.GET) as Promise<
      PaystackResponse<Refund>
    >;
  }
}
