import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateTransferRecipientPayload,
  GetTransferRecipientsOptions,
  Recipient,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { TransferRecipient } from "../types/models.ts";

/**
 * TransferRecipientClient provides methods that lets you interface with Paystack's
 * Transfer Recipients API which allows you to create and manage beneficiaries that you send money to.
 * https://paystack.com/docs/api/transfer-recipient/
 */
export default class TransferRecipientClient {
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
   * Creates a new recipient. A duplicate account number will lead to the
   * retrieval of the existing record.
   *
   * @param payload : {@link CreateTransferRecipientPayload} is the data sent to
   * paystack to create a transfer recipient.
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(
    payload: CreateTransferRecipientPayload,
  ): Promise<PaystackResponse<TransferRecipient>> {
    return this.client.call(
      "/transferrecipient",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<TransferRecipient>>;
  }

  /**
   * Create multiple transfer recipients in batches. A duplicate account
   * number will lead to the retrieval of the existing record.
   *
   * @param batch : A array of transfer recipients.
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  bulkCreate(batch: Recipient[]): Promise<
    PaystackResponse<
      // deno-lint-ignore no-explicit-any
      { readonly success: TransferRecipient[]; readonly errors: Array<any> }
    >
  > {
    return this.client.call("/transferrecipient/bulk", HTTPMethod.POST, {
      batch,
    }) as Promise<
      PaystackResponse<
        // deno-lint-ignore no-explicit-any
        { readonly success: TransferRecipient[]; readonly errors: Array<any> }
      >
    >;
  }

  /**
   * Fetch transfer recipients available on your integration
   *
   * @param options : {@link GetTransferRecipientsOptions} lets you customize
   * the data returned in the response
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransferRecipients(
    options?: GetTransferRecipientsOptions,
  ): Promise<PaystackResponse<TransferRecipient[]>> {
    return this.client.call(
      "/transferrecipient",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<TransferRecipient[]>>;
  }

  /**
   * Fetch the details of a transfer recipient
   *
   * @param idOrCode: An ID or code for the recipient whose details you want to receive.
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransferRecipient(
    idOrCode: string,
  ): Promise<PaystackResponse<TransferRecipient>> {
    return this.client.call(
      `/transferrecipient/${idOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<TransferRecipient>>;
  }

  /**
   * Update an existing recipient. An duplicate account number will lead
   * to the retrieval of the existing record.
   *
   * @param idOrCode: Transfer Recipient's ID or code
   * @param name : A name for the recipient
   * @param email: Email address of the recipient
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  update(
    idOrCode: string,
    name: string,
    email?: string,
  ): Promise<PaystackResponse<TransferRecipient>> {
    return this.client.call(`/transferrecipient/${idOrCode}`, HTTPMethod.PUT, {
      name,
      email,
    }) as Promise<PaystackResponse<TransferRecipient>>;
  }

  /**
   * Deletes a transfer recipient (sets the transfer recipient to inactive)
   *
   * @param idOrCode : An ID or code for the recipient who you want to delete.
   * @returns A promise containing a {@link PaystackResponse}
   */
  delete(idOrCode: string): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/transferrecipient/${idOrCode}`,
      HTTPMethod.DELETE,
    ) as Promise<PaystackResponse<undefined>>;
  }
}
