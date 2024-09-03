import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateCustomerPayload,
  GetCustomersOptions,
  UpdatePayload,
} from "../types/clients/customer.ts";

export default class CustomerClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreateCustomerPayload) {
    return this.client.call("/customer/", HTTPMethod.POST, payload);
  }

  getCustomers(options?: GetCustomersOptions) {
    return this.client.call("/customer/", HTTPMethod.GET, null, options);
  }

  getCustomer(emailOrCode: string) {
    return this.client.call(`/customer/${emailOrCode}`, HTTPMethod.GET);
  }

  update(code: string, payload: UpdatePayload) {
    return this.client.call(`/customer/${code}`, HTTPMethod.PUT, payload);
  }

  validate(emailOrCode: string, payload: UpdatePayload) {}
}
