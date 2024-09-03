import RestClient, { HTTPMethod } from "../restClient.ts";
import type { CreateProductPayload, GetProductsOptions } from "../types/clients/products.ts";

export default class ProductClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreateProductPayload){
    return this.client.call('/product',HTTPMethod.POST,payload)
  }

  getProducts(options?: GetProductsOptions){
    return this.client.call('/product',HTTPMethod.GET,null,options)
  }

  getProduct(id: string){
    return this.client.call(`/product/${id}`,HTTPMethod.GET)
  }

  update(id: string, payload: CreateProductPayload){
    return this.client.call(`/product/${id}`, HTTPMethod.PUT,payload)
  }
}

