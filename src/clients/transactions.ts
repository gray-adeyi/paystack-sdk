import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  ExportOptions,
  GetTransactionsOptions,
  InitializeTransactionPayload,
  PartialDebitPayload,
  TotalsOptions,
  TransactionChargePayload,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type {
  InitTransaction,
  Transaction,
  TransactionExport,
  TransactionLog,
  TransactionTotal,
} from "../types/models.ts";

/**
 * TransactionClient provides methods that lets you interface with Paystack's
 * Transactions API which allows you to create and manage payments on your
 * integration. see https://paystack.com/docs/api/transaction/
 */
export default class TransactionClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a TerminalClient
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
   * Initialize a transaction from your backend
   *
   * @param payload : {@link InitializeTransactionPayload} is the data sent to paystack
   * to initialize a transaction.
   * @returns A promise containing a {@link PaystackResponse<InitTransaction>}
   */
  initialize(
    payload: InitializeTransactionPayload,
  ): Promise<PaystackResponse<InitTransaction>> {
    return this.client.call(
      "/transaction/initialize",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<InitTransaction>>;
  }

  /**
   * Confirm the status of a transaction
   *
   * @param reference : The transaction reference used to initiate the transaction
   * @returns A promise containing a {@link PaystackResponse<Transaction>}
   */
  verify(reference: string): Promise<PaystackResponse<Transaction>> {
    return this.client.call(
      `/transaction/verify/${reference}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Fetch transactions carried out on your integration.
   *
   * @param options : {@link GetTransactionsOptions} lets you customize the
   * data to be returned in the response.
   * @returns A promise containing a {@link PaystackResponse<Transaction[]>}
   */
  getTransactions(
    options?: GetTransactionsOptions,
  ): Promise<PaystackResponse<Transaction[]>> {
    return this.client.call(
      `/transaction`,
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Transaction[]>>;
  }

  /**
   * Get details of a transaction carried out on your integration.
   *
   * @param id : An ID for the transaction to fetch
   * @returns A promise containing a {@link PaystackResponse<Transaction>}
   */
  getTransaction(id: string): Promise<PaystackResponse<Transaction>> {
    return this.client.call(`/transaction/${id}`, HTTPMethod.GET) as Promise<
      PaystackResponse<Transaction>
    >;
  }

  /**
   * All authorizations marked as reusable can be charged with this
   * method whenever you need to receive payments.
   *
   * @param payload: {@link TransactionChargePayload} is the data used to charge the
   * customer.
   * @returns A promise containing a {@link PaystackResponse<Transaction>}
   */
  charge(
    payload: TransactionChargePayload,
  ): Promise<PaystackResponse<Transaction>> {
    return this.client.call(
      "/transaction/charge_authorization",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * View the timeline of a transaction
   *
   * @param idOrRef : The ID or the reference of the transaction
   * @returns A promise containing a {@link PaystackResponse<TransactionLog>}
   */
  getTimeline(idOrRef: string): Promise<PaystackResponse<TransactionLog>> {
    return this.client.call(
      `/transaction/timeline/${idOrRef}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<TransactionLog>>;
  }

  /**
   * Total amount received on your account
   *
   * @param options : {@link TotalsOptions} lets you customize the data to be
   * retrieved in the response.
   * @returns A promise containing a {@link PaystackResponse<TransactionTotal>}
   */
  totals(options?: TotalsOptions): Promise<PaystackResponse<TransactionTotal>> {
    return this.client.call(
      "/transaction/totals",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<TransactionTotal>>;
  }

  /**
   * Fetch transactions carried out on your integration.
   *
   * @param options : {@link ExportOptions} lets you customize the export
   * @returns A promise containing a {@link PaystackResponse<TransactionExport>}
   */
  export(
    options?: ExportOptions,
  ): Promise<PaystackResponse<TransactionExport>> {
    return this.client.call(
      "/transaction/export",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<TransactionExport>>;
  }

  /**
   * Retrieve part of a payment from a customer
   *
   * @param payload : {@link PartialDebitPayload} is the data sent to paystack
   * to initiate a partial debit
   * @returns A promise containing a {@link PaystackResponse<Transaction>}
   */
  partialDebit(
    payload: PartialDebitPayload,
  ): Promise<PaystackResponse<Transaction>> {
    return this.client.call(
      "/transaction/partial_debit",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<Transaction>>;
  }
}
