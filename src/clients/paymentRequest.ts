import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreatePaymentRequestPayload,
  GetPaymentRequestsOptions,
  UpdatePaymentRequestPayload,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { PaymentRequest, PaymentRequestStat } from "../types/models.ts";

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
   * @param payload - {@link CreatePaymentRequestPayload} is the data sent to paystack
   * to create a payment request.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link PaymentRequest}
   */
  create(
    payload: CreatePaymentRequestPayload,
  ): Promise<PaystackResponse<PaymentRequest>> {
    return this.client.call(
      "/paymentrequest",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<PaymentRequest>>;
  }

  /**
   * Fetches the payment requests available on your integration.
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
   * @param options - {@link GetPaymentRequestsOptions} lets you customize the data
   * returned in the response.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link PaymentRequest}
   */
  getPaymentRequests(
    options?: GetPaymentRequestsOptions,
  ): Promise<PaystackResponse<PaymentRequest[]>> {
    return this.client.call(
      "/paymentrequest",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<PaymentRequest[]>>;
  }

  /**
   * Get details of a payment request on your integration
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
   * @param idOrCode - The payment request ID or code you want to fetch
   * @returns  A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link PaymentRequest}
   */
  getPaymentRequest(
    idOrCode: string,
  ): Promise<PaystackResponse<PaymentRequest>> {
    return this.client.call(
      `/paymentrequest/${idOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<PaymentRequest>>;
  }

  /**
   * Verify details of a payment request on your integration.
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
   * @param idOrCode - The payment request ID or code
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link PaymentRequest}
   */
  verify(idOrCode: string): Promise<PaystackResponse<PaymentRequest>> {
    return this.client.call(
      `/paymentrequest/verify/${idOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<PaymentRequest>>;
  }

  /**
   * Send notification of a payment request to your customers
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
   * @param idOrCode - The payment request ID or code
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  sendNotification(idOrCode: string): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/paymentrequest/notify/${idOrCode}`,
      HTTPMethod.POST,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Get payment requests metric
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
   * The data property of the object is another object of type {@link PaymentRequestStat}
   */
  getTotal(): Promise<PaystackResponse<PaymentRequestStat>> {
    return this.client.call(
      "/paymentrequest/totals",
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<PaymentRequestStat>>;
  }

  /**
   * Finalize a draft payment request
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
   * @param idOrCode - The payment request ID or code
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link PaymentRequest}
   */
  finalize(idOrCode: string): Promise<PaystackResponse<PaymentRequest>> {
    return this.client.call(
      `/paymentrequest/finalize/${idOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<PaymentRequest>>;
  }

  /**
   * Update the payment request details on your integration
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
   * @param idOrCode - The payment request ID or code
   * @param payload - {@link UpdatePaymentRequestPayload} is the data sent to paystack
   * to update the payment request.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link PaymentRequest}
   */
  update(
    idOrCode: string,
    payload: UpdatePaymentRequestPayload,
  ): Promise<PaystackResponse<PaymentRequest>> {
    return this.client.call(
      `/paymentrequest/${idOrCode}`,
      HTTPMethod.PUT,
      payload,
    ) as Promise<PaystackResponse<PaymentRequest>>;
  }

  /**
   * Used to archive a payment request. A payment
   * request will no longer be fetched on list or returned on verify.
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
   * @param idOrCode - The payment request ID or code
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  archive(idOrCode: string): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/paymentrequest/archive/${idOrCode}`,
      HTTPMethod.POST,
    ) as Promise<PaystackResponse<undefined>>;
  }
}
