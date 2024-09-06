import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  ChargePayload,
  ExportOptions,
  GetTransactionsOptions,
  InitializeTransactionPayload,
  PartialDebitPayload,
  TotalsOptions,
} from "../types/clients/transactions.ts";
import type { PaystackResponse } from "../types/global.ts";

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
   * @returns A promise containing a {@link PaystackResponse}
   */
  initialize(payload: InitializeTransactionPayload): Promise<PaystackResponse> {
    return this.client.call(
      "/transaction/initialize",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Confirm the status of a transaction
   *
   * @param reference : The transaction reference used to initiate the transaction
   * @returns A promise containing a {@link PaystackResponse}
   */
  verify(reference: string): Promise<PaystackResponse> {
    return this.client.call(`/transaction/verify/${reference}`, HTTPMethod.GET);
  }

  /**
   * Fetch transactions carried out on your integration.
   *
   * @param options : {@link GetTransactionsOptions} lets you customize the
   * data to be returned in the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransactions(options?: GetTransactionsOptions): Promise<PaystackResponse> {
    return this.client.call(`/transaction`, HTTPMethod.GET, null, options);
  }

  /**
   * Get details of a transaction carried out on your integration.
   *
   * @param id :An ID for the transaction to fetch
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransaction(id: string): Promise<PaystackResponse> {
    return this.client.call(`/transaction/${id}`, HTTPMethod.GET);
  }

  /**
   * All authorizations marked as reusable can be charged with this
   * method whenever you need to receive payments.
   *
   * @param payload: {@link ChargePayload} is the data used to charge the
   * customer.
   * @returns A promise containing a {@link PaystackResponse}
   */
  charge(payload: ChargePayload): Promise<PaystackResponse> {
    return this.client.call(
      "/transaction/charge_authorization",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * View the timeline of a transaction
   *
   * @param idOrRef : The ID or the reference of the transaction
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTimeline(idOrRef: string): Promise<PaystackResponse> {
    return this.client.call(`/transaction/timeline/${idOrRef}`, HTTPMethod.GET);
  }

  /**
   * Total amount received on your account
   *
   * @param options : {@link TotalsOptions} lets you customize the data to be
   * retrieved in the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  totals(options?: TotalsOptions): Promise<PaystackResponse> {
    return this.client.call(
      "/transaction/totals",
      HTTPMethod.GET,
      null,
      options,
    );
  }

  /**
   * Fetch transactions carried out on your integration.
   *
   * @param options : {@link ExportOptions} lets you customize the export
   * @returns A promise containing a {@link PaystackResponse}
   */
  export(options?: ExportOptions): Promise<PaystackResponse> {
    return this.client.call(
      "/transaction/export",
      HTTPMethod.GET,
      null,
      options,
    );
  }

  /**
   * Retrieve part of a payment from a customer
   *
   * @param payload : {@link PartialDebitPayload} is the data sent to paystack
   * to initiate a partial debit
   * @returns A promise containing a {@link PaystackResponse}
   */
  partialDebit(payload: PartialDebitPayload): Promise<PaystackResponse> {
    return this.client.call(
      "/transaction/partial_debit",
      HTTPMethod.POST,
      payload,
    );
  }
}
