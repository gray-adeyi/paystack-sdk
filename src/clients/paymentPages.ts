import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreatePaymentPagePayload,
  GetPagesOptions,
  UpdatePaymentPagePayload,
} from "../types/clients/paymentPages.ts";

export default class PaymentPageClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreatePaymentPagePayload) {
    return this.client.call("/page", HTTPMethod.POST, payload);
  }

  getPages(options?: GetPagesOptions) {
    return this.client.call("/page", HTTPMethod.GET, null, options);
  }

  getPage(idOrSlug: string) {
    return this.client.call(`/page/${idOrSlug}`, HTTPMethod.GET);
  }

  update(idOrSlug: string, payload: UpdatePaymentPagePayload) {
    return this.client.call(`/page/${idOrSlug}`, HTTPMethod.PUT, payload);
  }

  checkSlugAvailable(slug: string){
    return this.client.call(`/page/check_slug_availability/${slug}`, HTTPMethod.GET)
  }

  addProducts(id: string, products: string[]){
    return this.client.call(`/page/${id}/product`,HTTPMethod.POST, products)
  }
}
