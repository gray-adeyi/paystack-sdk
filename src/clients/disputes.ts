import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  AddEvidencePayload,
  ExportDisputesOptions,
  GetDisputesOptions,
  ResolveDisputePayload,
} from "../types/clients/disputes.ts";
import type { PaystackResponse } from "../types/global.ts";
import type {
  Dispute,
  DisputeEvidence,
  DisputeExportInfo,
  DisputeUploadInfo,
} from "../types/models.ts";

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
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param options - {@link GetDisputesOptions} lets you customize the data
   * in the response to be returned.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link Dispute}
   */
  getDisputes(
    options?: GetDisputesOptions,
  ): Promise<PaystackResponse<Dispute[]>> {
    return this.client.call(
      "/dispute",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Dispute[]>>;
  }

  /**
   * Get more details about a dispute.
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param id - The dispute ID you want to fetch
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Dispute}
   */
  getDispute(id: string): Promise<PaystackResponse<Dispute>> {
    return this.client.call(`/dispute/${id}`, HTTPMethod.GET) as Promise<
      PaystackResponse<Dispute>
    >;
  }

  /**
   * This method retrieves disputes for a particular transaction
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param id - The transaction id you want to fetch.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property is an array of objects whose type is {@link Dispute}
   */
  getTransactionDisputes(id: string): Promise<PaystackResponse<Dispute[]>> {
    return this.client.call(
      `/dispute/transaction/${id}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Dispute[]>>;
  }

  /**
   * Update details of a dispute on your integration
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param id - Dispute ID
   * @param refundAmount - The amount to refund, in kobo if currency is NGN, pesewas,
   * if currency is GHS, and cents, if currency is ZAR
   * @param uploadedFilename - filename of attachment returned via response from
   * upload url PaystackClient.disputes.getUploadUrl
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Dispute}
   */
  updateDispute(
    id: string,
    refundAmount: number,
    uploadedFilename: string,
  ): Promise<PaystackResponse<Dispute>> {
    return this.client.call(`/dispute/${id}`, HTTPMethod.PUT, {
      refundAmount,
      uploadedFilename,
    }) as Promise<PaystackResponse<Dispute>>;
  }

  /**
   * Provide evidence for a dispute.
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param id - Dispute ID
   * @param payload - {@link AddEvidencePayload} is the data sent to paystack containing the
   * evidence.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link DisputeEvidence}
   */
  addEvidence(
    id: string,
    payload: AddEvidencePayload,
  ): Promise<PaystackResponse<DisputeEvidence>> {
    return this.client.call(
      `/dispute/${id}/evidence`,
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<DisputeEvidence>>;
  }

  /**
   * Get URL to upload a dispute evidence.
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param id - Dispute ID
   * @param uploadFilename - The file name, with its extension, that you want to upload. e.g. filename.pdf
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link DisputeUploadInfo}
   */
  getUploadUrl(
    id: string,
    uploadFilename: string,
  ): Promise<PaystackResponse<DisputeUploadInfo>> {
    return this.client.call(`/dispute/${id}/upload_url`, HTTPMethod.GET, null, {
      uploadFilename,
    }) as Promise<PaystackResponse<DisputeUploadInfo>>;
  }

  /**
   * Resolve a dispute on your integration
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param id - Dispute ID
   * @param payload - {@link ResolveDisputePayload} for resolving the dispute
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Dispute}
   */
  resolveDispute(
    id: string,
    payload: ResolveDisputePayload,
  ): Promise<PaystackResponse<Dispute>> {
    return this.client.call(
      `/dispute/${id}/resolve`,
      HTTPMethod.PUT,
      payload,
    ) as Promise<PaystackResponse<Dispute>>;
  }

  /**
   * Export disputes available on your integration.
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param options - {@link ExportDisputesOptions} lets you customize the export
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link DisputeExportInfo}
   */
  exportDisputes(
    options: ExportDisputesOptions,
  ): Promise<PaystackResponse<DisputeExportInfo>> {
    return this.client.call(
      "/dispute/export",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<DisputeExportInfo>>;
  }
}
