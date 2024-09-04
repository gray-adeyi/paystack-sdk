import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  AddEvidencePayload,
  ExportDisputesOptions,
  GetDisputesOptions,
  ResolveDisputePayload,
} from "../types/clients/disputes.ts";

export default class DisputeClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  getDisputes(options: GetDisputesOptions) {
    return this.client.call("/dispute", HTTPMethod.GET, null, options);
  }

  getDispute(id: string) {
    return this.client.call(`/dispute/${id}`, HTTPMethod.GET);
  }

  getTransactionDisputes(id: string) {
    return this.client.call(`/dispute/transaction/${id}`, HTTPMethod.GET);
  }

  updateDispute(id: string, refundAmount: number, uploadedFilename: string) {
    return this.client.call(`/dispute/${id}`, HTTPMethod.PUT, {
      refundAmount,
      uploadedFilename,
    });
  }

  addEvidence(id: string, payload: AddEvidencePayload) {
    return this.client.call(
      `/dispute/${id}/evidence`,
      HTTPMethod.POST,
      payload,
    );
  }

  getUploadUrl(id: string, uploadFilename: string) {
    return this.client.call(`/dispute/${id}/upload_url`, HTTPMethod.GET, null, {
      uploadFilename,
    });
  }

  resolveDispute(id: string, payload: ResolveDisputePayload) {
    return this.client.call(`/dispute/${id}/resolve`, HTTPMethod.PUT, payload);
  }

  exportDisputes(options: ExportDisputesOptions) {
    return this.client.call("/dispute/export", HTTPMethod.GET, null, options);
  }
}
