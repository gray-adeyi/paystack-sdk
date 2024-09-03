import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  ChargePayload,
  ExportOptions,
  GetTransactionsOptions,
  InitializePayload,
  PartialDebitPayload,
  TotalsOptions,
} from "../types/clients/transactions.ts";

export default class TransactionClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  initialize(payload: InitializePayload) {
    return this.client.call(
      "/transaction/initialize",
      HTTPMethod.POST,
      payload,
    );
  }

  verify(reference: string) {
    return this.client.call(`/transaction/verify/${reference}`, HTTPMethod.GET);
  }

  getTransactions(options?: GetTransactionsOptions) {
    return this.client.call(`/transaction`, HTTPMethod.GET, null, options);
  }

  getTransaction(id: string) {
    return this.client.call(`/transaction/${id}`, HTTPMethod.GET);
  }

  charge(payload: ChargePayload) {
    return this.client.call(
      "/transaction/charge_authorization",
      HTTPMethod.POST,
      payload,
    );
  }

  getTimeline(idOrRef: string) {
    return this.client.call(`/transaction/timeline/${idOrRef}`, HTTPMethod.GET);
  }

  totals(options?: TotalsOptions) {
    return this.client.call(
      "/transaction/totals",
      HTTPMethod.GET,
      null,
      options,
    );
  }

  export(options?: ExportOptions) {
    return this.client.call(
      "/transaction/export",
      HTTPMethod.GET,
      null,
      options,
    );
  }

  partialDebit(payload: PartialDebitPayload) {
    return this.client.call(
      "/transaction/partial_debit",
      HTTPMethod.POST,
      payload,
    );
  }
}
