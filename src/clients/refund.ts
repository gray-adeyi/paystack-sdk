import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateRefundPayload,
  GetRefundsOptions,
} from "../types/clients/refund.ts";

export default class RefundClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreateRefundPayload) {
    return this.client.call("/refund", HTTPMethod.POST, payload);
  }

  getRefunds(options: GetRefundsOptions) {
    return this.client.call("/refund", HTTPMethod.GET, null, options);
  }

  getRefund(reference: string) {
    return this.client.call(`/refund/${reference}`, HTTPMethod.GET);
  }
}
