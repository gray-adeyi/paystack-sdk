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
   * @param payload : {@link CreatePaymentPagePayload} is the data sent to paystack to
   * create a payment page.
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: CreatePaymentPagePayload) {
    return this.client.call("/page", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<PaymentPage>
    >;
  }

  /**
   * Fetch payment pages available on your integration.
   *
   * @param options : {@link GetPagesOptions} lets you customize the data to be
   * returned in the response
   * @returns A promise containing a {@link PaystackResponse}
   */
  getPages(options?: GetPagesOptions) {
    return this.client.call("/page", HTTPMethod.GET, null, options) as Promise<
      PaystackResponse<PaymentPage[]>
    >;
  }

  /**
   * Get details of a payment page on your integration.
   *
   * @param idOrSlug : The page ``ID`` or ``slug`` you want to fetch
   * @returns A promise containing a {@link PaystackResponse}
   */
  getPage(idOrSlug: string) {
    return this.client.call(`/page/${idOrSlug}`, HTTPMethod.GET) as Promise<
      PaystackResponse<PaymentPage>
    >;
  }

  /**
   * Update a payment page.
   *
   * @param idOrSlug The page ``ID`` or ``slug`` you want to update
   * @param payload : {@link UpdatePaymentPagePayload} is the data used to update
   * the payment page
   * @returns A promise containing a {@link PaystackResponse}
   */
  update(
    idOrSlug: string,
    payload: UpdatePaymentPagePayload,
  ) {
    return this.client.call(
      `/page/${idOrSlug}`,
      HTTPMethod.PUT,
      payload,
    ) as Promise<PaystackResponse<PaymentPage>>;
  }

  /**
   * Check the availability of a slug for a payment page.
   *
   * @param slug : URL slug to be confirmed
   * @returns A promise containing a {@link PaystackResponse}
   */
  checkSlugAvailable(slug: string) {
    return this.client.call(
      `/page/check_slug_availability/${slug}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Add products to a payment page.
   *
   * @param id : The ID of the payment page.
   * @param products : An array of the IDs of the products to be added.
   * @returns
   */
  addProducts(id: string, products: string[]) {
    return this.client.call(`/page/${id}/product`, HTTPMethod.POST, {
      products,
    }) as Promise<PaystackResponse<PaymentPage>>;
  }
}
