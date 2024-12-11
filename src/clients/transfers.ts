import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetTransferOptions,
  InitiateTransferPayload,
  TransferInstruction,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { BulkTransferItem, Transfer } from "../types/models.ts";

/**
 * TransferClient provides methods that lets you interface with Paystack's
 * Transfers API which allows you to automate sending money on your integration
 * https://paystack.com/docs/api/transfer/
 */
export default class TransferClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a TransferRecipientClient
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
   * Initiate transfer
   *
   * @param payload : {@link InitiateTransferPayload} is the data sent to paystack
   * to initiate a transfer.
   * @returns A promise containing a {@link PaystackResponse}
   */
  initiate(payload: InitiateTransferPayload): Promise<
    PaystackResponse<Transfer>
  > {
    return this.client.call("/transfer", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Transfer>
    >;
  }

  /**
   * Finalize a transfer
   *
   * @param transferCode : The code for transfer.
   * @param otp : one time password.
   * @returns A promise containing a {@link PaystackResponse}
   */
  finalize(
    transferCode: string,
    otp: string,
  ): Promise<PaystackResponse<Transfer>> {
    return this.client.call("/transfer/finalize_transfer", HTTPMethod.POST, {
      transferCode,
      otp,
    }) as Promise<PaystackResponse<Transfer>>;
  }

  /**
   * Transfer in bulk
   *
   * @param transfers : An array of transfer instructions.
   * @param source : source of the fund used for the transfer.
   * @returns A promise containing a {@link PaystackResponse}
   */
  bulkTransfer(
    transfers: TransferInstruction[],
    source = "balance",
  ): Promise<PaystackResponse<BulkTransferItem[]>> {
    return this.client.call("transfer/bulk", HTTPMethod.POST, {
      transfers,
      source,
    }) as Promise<PaystackResponse<BulkTransferItem[]>>;
  }

  /**
   * Retrieve transfers made to a customer
   *
   * @param options : {@link GetTransferOptions} lets you customize the data to
   * be returned in the response
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransfers(
    options?: GetTransferOptions,
  ): Promise<PaystackResponse<Transfer[]>> {
    return this.client.call(
      "/transfer",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Transfer[]>>;
  }

  /**
   * Retrieve a transfer
   *
   * @param idOrCode : transfer ID or code.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransfer(idOrCode: string): Promise<PaystackResponse<Transfer>> {
    return this.client.call(
      `/transfer/${idOrCode}/`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Transfer>>;
  }

  /**
   * Verify a transfer
   *
   * @param reference : a reference for the transfer.
   * @returns A promise containing  a {@link PaystackResponse}
   */
  verify(reference: string): Promise<PaystackResponse<Transfer>> {
    return this.client.call(
      `transfer/verify/${reference}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Transfer>>;
  }
}
