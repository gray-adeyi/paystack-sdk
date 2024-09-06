import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetTransferOptions,
  InitiateTransferPayload,
  TransferInstruction,
} from "../types/clients/transfers.ts";
import type { PaystackResponse } from "../types/global.ts";

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
  initiate(payload: InitiateTransferPayload): Promise<PaystackResponse> {
    return this.client.call("/transfer", HTTPMethod.POST, payload);
  }

  /**
   * Finalize a transfer
   *
   * @param transferCode : The code for transfer.
   * @param otp : one time password.
   * @returns A promise containing a {@link PaystackResponse}
   */
  finalize(transferCode: string, otp: string): Promise<PaystackResponse> {
    return this.client.call("/transfer/finalize_transfer", HTTPMethod.POST, {
      transferCode,
      otp,
    });
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
  ): Promise<PaystackResponse> {
    return this.client.call("transfer/bulk", HTTPMethod.POST, {
      transfers,
      source,
    });
  }

  /**
   * Retrieve transfers made to a customer
   *
   * @param options : {@link GetTransferOptions} lets you customize the data to
   * be returned in the response
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransfers(options?: GetTransferOptions): Promise<PaystackResponse> {
    return this.client.call("/transfer", HTTPMethod.GET, null, options);
  }

  /**
   * Retrieve a transfer
   *
   * @param idOrCode : transfer ID or code.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransfer(idOrCode: string): Promise<PaystackResponse> {
    return this.client.call(`/transfer/${idOrCode}/`, HTTPMethod.GET);
  }

  /**
   * Verify a transfer
   *
   * @param reference : a reference for the transfer.
   * @returns A promise containing  a {@link PaystackResponse}
   */
  verify(reference: string): Promise<PaystackResponse> {
    return this.client.call(`transfer/verify/${reference}`, HTTPMethod.GET);
  }
}
