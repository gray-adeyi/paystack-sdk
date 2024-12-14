import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateProductPayload,
  GetProductsOptions,
  UpdateProductPayload,
} from "../types/clients/products.ts";
import type { PaystackResponse } from "../types/global.ts";
import { Product } from "../types/models.ts";

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
   * @param payload - {@link CreateProductPayload} is the data sent to paystack to
   * create a product.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Product}
   */
  create(payload: CreateProductPayload): Promise<
    PaystackResponse<Product>
  > {
    return this.client.call("/product", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Product>
    >;
  }

  /**
   * Fetches products available on your integration.
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
   * @param options - {@link GetProductsOptions} lets you customize the data returned in
   * the response.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link Product}
   */
  getProducts(
    options?: GetProductsOptions,
  ): Promise<PaystackResponse<Product[]>> {
    return this.client.call(
      "/product",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Product[]>>;
  }

  /**
   * Get details of a product on your integration.
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
   * @param id - The product ``ID`` you want to fetch
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Product}
   */
  getProduct(id: string): Promise<
    PaystackResponse<Product>
  > {
    return this.client.call(`/product/${id}`, HTTPMethod.GET) as Promise<
      PaystackResponse<Product>
    >;
  }

  /**
   * Update a product.
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
   * @param id - The product ``ID`` you want to update
   * @param payload - {@link UpdateProductPayload} is the data that is used to update
   * the product.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Product}
   */
  update(
    id: string,
    payload: UpdateProductPayload,
  ): Promise<PaystackResponse<Product>> {
    return this.client.call(
      `/product/${id}`,
      HTTPMethod.PUT,
      payload,
    ) as Promise<PaystackResponse<Product>>;
  }
}
