import RestClient, { HTTPMethod } from "../restClient.ts";
import { GetDomainsOptions } from "../types/clients/applePay.ts";

export default class ApplePayClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  registerDomain(domainName: string) {
    return this.client.call("/apple-pay/domain", HTTPMethod.POST, {
      domainName,
    });
  }

  getDomains(options: GetDomainsOptions) {
    return this.client.call("/apple-pay/domain", HTTPMethod.GET, null, options);
  }

  unregisterDomain(domainName: string) {
    return this.client.call("/apple-pay/domain", HTTPMethod.DELETE, {
      domainName,
    });
  }
}
