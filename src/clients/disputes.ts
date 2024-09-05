import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  AddEvidencePayload,
  ExportDisputesOptions,
  GetDisputesOptions,
  ResolveDisputePayload,
} from "../types/clients/disputes.ts";
import type { PaystackResponse } from "../types/global.ts";

/**
 * DisputeClient provides methods that lets you interface with Paystack's
 * Disputes API allows you to manage transaction disputes on your integration.
 * https://paystack.com/docs/api/dispute/
 */
export default class DisputeClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a DisputeClient
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
   * Retrieves disputes filed against you
   *
   * @param options : {@link GetDisputesOptions} let's you customize the data
   * in the response to be returned.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getDisputes(options?: GetDisputesOptions): Promise<PaystackResponse> {
    return this.client.call("/dispute", HTTPMethod.GET, null, options);
  }

  /**
   * Get more details about a dispute.
   *
   * @param id: The dispute ID you want to fetch
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  getDispute(id: string): Promise<PaystackResponse> {
    return this.client.call(`/dispute/${id}`, HTTPMethod.GET);
  }

  /**
   * This method retrieves disputes for a particular transaction
   *
   * @param id: The transaction id you want to fetch.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTransactionDisputes(id: string): Promise<PaystackResponse> {
    return this.client.call(`/dispute/transaction/${id}`, HTTPMethod.GET);
  }

  /**
   * Update details of a dispute on your integration
   *
   * @param id: Dispute ID
   * @param refundAmount : the amount to refund, in kobo if currency is NGN, pesewas,
   * if currency is GHS, and cents, if currency is ZAR
   * @param uploadedFilename : filename of attachment returned via response from
   * upload url PaystackClient.disputes.getUploadUrl
   * @returns A promise containing a {@link PaystackResponse}
   */
  updateDispute(
    id: string,
    refundAmount: number,
    uploadedFilename: string,
  ): Promise<PaystackResponse> {
    return this.client.call(`/dispute/${id}`, HTTPMethod.PUT, {
      refundAmount,
      uploadedFilename,
    });
  }

  /**
   * Provide evidence for a dispute.
   *
   * @param id : Dispute ID
   * @param payload {@link AddEvidencePayload} is the data sent to paystack containing the
   * evidence.
   * @returns A promise containing a {@link PaystackResponse}
   */
  addEvidence(
    id: string,
    payload: AddEvidencePayload,
  ): Promise<PaystackResponse> {
    return this.client.call(
      `/dispute/${id}/evidence`,
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Get URL to upload a dispute evidence.
   *
   * @param id : Dispute ID
   * @param uploadFilename : The file name, with its extension, that you want to upload. e.g. filename.pdf
   * @returns A promise containing a {@link PaystackResponse}
   */
  getUploadUrl(id: string, uploadFilename: string): Promise<PaystackResponse> {
    return this.client.call(`/dispute/${id}/upload_url`, HTTPMethod.GET, null, {
      uploadFilename,
    });
  }

  /**
   * Resolve a dispute on your integration
   *
   * @param id : Dispute ID
   * @param payload : {@link ResolveDisputePayload} for resolving the dispute
   * @returns A promise containing a {@link PaystackResponse}
   */
  resolveDispute(
    id: string,
    payload: ResolveDisputePayload,
  ): Promise<PaystackResponse> {
    return this.client.call(`/dispute/${id}/resolve`, HTTPMethod.PUT, payload);
  }

  /**
   * Export disputes available on your integration.
   *
   * @param options : {@link ExportDisputesOptions} let's you customize the export
   * @returns A promise containing a {@link PaystackResponse}
   */
  exportDisputes(options: ExportDisputesOptions): Promise<PaystackResponse> {
    return this.client.call("/dispute/export", HTTPMethod.GET, null, options);
  }
}
