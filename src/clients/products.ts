import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateProductPayload,
  GetProductsOptions,
  UpdateProductPayload,
} from "../types/clients/products.ts";
import type { PaystackResponse } from "../types/global.ts";

/**
 * ProductClient provides methods that lets you interface with Paystack's
 * Products API which allows you to create and manage inventories on your
 * integration. https://paystack.com/docs/api/product/
 */
export default class ProductClient {
  client: RestClient;

  /**
   * @constructor Instantiate a ProductClient
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
   * Create a product on your integration
   *
   * @param payload : {@link CreateProductPayload} is the data sent to paystack to
   * create a product.
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: CreateProductPayload): Promise<PaystackResponse> {
    return this.client.call("/product", HTTPMethod.POST, payload);
  }

  /**
   * Fetches products available on your integration.
   *
   * @param options : {@link GetProductsOptions} lets you customize the data returned in
   * the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getProducts(options?: GetProductsOptions):Promise<PaystackResponse> {
    return this.client.call("/product", HTTPMethod.GET, null, options);
  }

  /**
   * Get details of a product on your integration.
   *
   * @param id : The product ``ID`` you want to fetch
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  getProduct(id: string): Promise<PaystackResponse> {
    return this.client.call(`/product/${id}`, HTTPMethod.GET);
  }

  /**
   * @param id The product ``ID`` you want to update
   * @param payload : {@link UpdateProductPayload} is the data that is used to update
   * the product.
   * @returns A promise containing a {@link PaystackResponse}
   */
  update(id: string, payload: UpdateProductPayload):Promise<PaystackResponse> {
    return this.client.call(`/product/${id}`, HTTPMethod.PUT, payload);
  }
}
