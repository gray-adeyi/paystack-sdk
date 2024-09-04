import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  AssignDedicatedAccountPayload,
  CreateDedicatedAccountPayload,
  GetDedicatedAccountsOptions,
  SplitPayload,
} from "../types/clients/dedicatedAccounts.ts";

export default class DedicatedAccountClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreateDedicatedAccountPayload) {
    return this.client.call(
      "/dedicated_account",
      HTTPMethod.POST,
      payload,
    );
  }

  assign(payload: AssignDedicatedAccountPayload) {
    return this.client.call(
      "/dedicated_account/assign",
      HTTPMethod.POST,
      payload,
    );
  }

  getDedicatedAccounts(options: GetDedicatedAccountsOptions) {
    return this.client.call(
      "/dedicated_account",
      HTTPMethod.GET,
      null,
      options,
    );
  }

  getDedicatedAccount(dedicatedAccountId: string) {
    return this.client.call(
      `/dedicated_account/${dedicatedAccountId}`,
      HTTPMethod.GET,
    );
  }

  requery(accountNumber: string, providerSlug: string, date?: string) {
    return this.client.call(
      "dedicated_account",
      HTTPMethod.GET,
      null,
      { accountNumber, providerSlug, date },
    );
  }

  deactivate(dedicatedAccountId: string) {
    return this.client.call(
      `dedicated_account/${dedicatedAccountId}`,
      HTTPMethod.DELETE,
    );
  }

  split(payload: SplitPayload) {
    return this.client.call(
      "/dedicated_account/split",
      HTTPMethod.POST,
      payload,
    );
  }

  removeSplit(accountNumber: string) {
    return this.client.call(
      "/dedicated_account/split",
      HTTPMethod.DELETE,
      { accountNumber },
    );
  }

  getProviders() {
    return this.client.call(
      "/dedicated_account/available_providers",
      HTTPMethod.GET,
    );
  }
}
