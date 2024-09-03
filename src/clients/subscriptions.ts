import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateSubscriptionPayload,
  GetSubscriptionsOptions,
} from "../types/clients/subscriptions.ts";

export default class SubscriptionClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreateSubscriptionPayload) {
    return this.client.call("/subscription", HTTPMethod.POST, payload);
  }

  getSubscriptions(options?: GetSubscriptionsOptions) {
    return this.client.call("/subscription", HTTPMethod.GET, null, options);
  }

  getSubscription(idOrCode: string) {
    return this.client.call(`/subscription/${idOrCode}`, HTTPMethod.GET);
  }

  enable(code: string, token: string) {
    return this.client.call("/subscription/enable", HTTPMethod.POST, {
      code,
      token,
    });
  }

  disable(code: string, token: string) {
    return this.client.call("/subscription/disable", HTTPMethod.POST, {
      code,
      token,
    });
  }

  getUpdateLink(code: string) {
    return this.client.call(
      `/subscription/${code}/manage/link`,
      HTTPMethod.GET,
    );
  }

  sendUpdateLink(code: string) {
    return this.client.call(
      `/subscription/${code}/manage/email/`,
      HTTPMethod.POST,
    );
  }
}
