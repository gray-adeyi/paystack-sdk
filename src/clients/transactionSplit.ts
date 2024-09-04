import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetSplitsOptions,
  TransactionSplitCreatePayload,
  UpdateTxSplitPayload,
} from "../types/clients/transactionSplit.ts";

export default class TransactionSplitClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: TransactionSplitCreatePayload) {
    return this.client.call("/split", HTTPMethod.POST, payload);
  }

  getSplits(options: GetSplitsOptions) {
    return this.client.call("/split", HTTPMethod.GET, null, options);
  }

  getSplit(id: string) {
    return this.client.call(`/split/${id}`, HTTPMethod.GET);
  }

  update(id: string, payload: UpdateTxSplitPayload) {
    return this.client.call(`/split/${id}`, HTTPMethod.POST, payload);
  }

  addOrUpdate(id: string, subaccount: string, share: number) {
    return this.client.call(`/split/${id}/subaccount/add`, HTTPMethod.POST, {
      subaccount,
      share,
    });
  }

  remove(id: string, subaccount: string) {
    return this.client.call(`/split/${id}/subaccount/remove`, HTTPMethod.POST, {
      subaccount,
    });
  }
}
