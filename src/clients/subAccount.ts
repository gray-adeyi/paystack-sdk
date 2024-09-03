import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateSubAccountPayload,
  GetSubAccountsOptions,
  UpdateSubAccountPayload,
} from "../types/clients/subAccount.ts";

export default class SubAccountClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreateSubAccountPayload) {
    return this.client.call("/subaccount", HTTPMethod.POST, payload);
  }

  getSubAccounts(options?: GetSubAccountsOptions) {
    return this.client.call("/subaccount", HTTPMethod.GET, null, options);
  }

  getSubAccount(idOrCode: string) {
    return this.client.call(`/subaccount/${idOrCode}`, HTTPMethod.GET);
  }

  update(idOrCode: string, payload: UpdateSubAccountPayload) {
    return this.client.call(`/subaccount/${idOrCode}`, HTTPMethod.PUT, payload);
  }
}
