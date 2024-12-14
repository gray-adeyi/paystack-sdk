import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreatePaymentPagePayload,
  GetPagesOptions,
  UpdatePaymentPagePayload,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { PaymentPage } from "../types/models.ts";

/**
 * PaymentPageClient provides method that lets you interface with Paystack's
 * Payment Pages API which provides a quick and secure way to collect payment
 * for products. https://paystack.com/docs/api/page/
 */
export default class PaymentPageClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a PaymentPageClient
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
   * Create a payment page on your integration
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
   * @param payload - {@link CreatePaymentPagePayload} is the data sent to paystack to
   * create a payment page.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link PaymentPage}
   */
  create(payload: CreatePaymentPagePayload): Promise<
    PaystackResponse<PaymentPage>
  > {
    return this.client.call("/page", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<PaymentPage>
    >;
  }

  /**
   * Fetch payment pages available on your integration.
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
   * @param options - {@link GetPagesOptions} lets you customize the data to be
   * returned in the response
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link PaymentPage}
   */
  getPages(options?: GetPagesOptions): Promise<
    PaystackResponse<PaymentPage[]>
  > {
    return this.client.call("/page", HTTPMethod.GET, null, options) as Promise<
      PaystackResponse<PaymentPage[]>
    >;
  }

  /**
   * Get details of a payment page on your integration.
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
   * @param idOrSlug - The page ``ID`` or ``slug`` you want to fetch
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link PaymentPage}
   */
  getPage(idOrSlug: string): Promise<
    PaystackResponse<PaymentPage>
  > {
    return this.client.call(`/page/${idOrSlug}`, HTTPMethod.GET) as Promise<
      PaystackResponse<PaymentPage>
    >;
  }

  /**
   * Update a payment page.
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
   * @param idOrSlug - The page ``ID`` or ``slug`` you want to update
   * @param payload - {@link UpdatePaymentPagePayload} is the data used to update
   * the payment page
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link PaymentPage}
   */
  update(
    idOrSlug: string,
    payload: UpdatePaymentPagePayload,
  ): Promise<PaystackResponse<PaymentPage>> {
    return this.client.call(
      `/page/${idOrSlug}`,
      HTTPMethod.PUT,
      payload,
    ) as Promise<PaystackResponse<PaymentPage>>;
  }

  /**
   * Check the availability of a slug for a payment page.
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
   * @param slug - URL slug to be confirmed
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  checkSlugAvailable(slug: string): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/page/check_slug_availability/${slug}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Add products to a payment page.
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
   * @param id - The ID of the payment page.
   * @param products - An array of the IDs of the products to be added.
   * @returns A promise that resolves an object whose type is {@link PaystackResponse}.
   * The data property of the object is of type {@link PaymentPage}
   */
  addProducts(
    id: string,
    products: number[] | string[],
  ): Promise<PaystackResponse<PaymentPage>> {
    return this.client.call(`/page/${id}/product`, HTTPMethod.POST, {
      products,
    }) as Promise<PaystackResponse<PaymentPage>>;
  }
}
