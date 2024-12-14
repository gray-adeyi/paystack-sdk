import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  BulkChargeInstruction,
  GetBatchesOptions,
  GetChargesInBatchOptions,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { BulkCharge, BulkChargeUnitCharge } from "../types/models.ts";

/**
 * BulkChargeClient provides methods that lets you interface with Paystack's
 * Bulk Charge API which allows you to create and manage multiple recurring
 * payments from your customers. https://paystack.com/docs/api/bulk-charge/
 */
export default class BulkChargeClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a BulkChargeClient
   *
   * @param secretKey - Your paystack integration secret key.
   * @param client - A custom rest client to use for making api calls to paystack instead
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
   * Initiate a bulk charge
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
   * @param payload - A array of {@link BulkChargeInstruction}, each containing individual
   * charges to be charged.
   * @returns A promise that resolve to an object whose type is {@link PaystackResponse}.
   * The data property of this object is another object whose type is {@link BulkCharge}
   */
  initiate(payload: BulkChargeInstruction[]): Promise<
    PaystackResponse<BulkCharge>
  > {
    return this.client.call("/bulkcharge", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<BulkCharge>
    >;
  }
  /**
   * Retrieves all bulk charge batches created by the integration.
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
   * @param options - {@link GetBatchesOptions} lets you customize the data in the
   * response to be returned.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of this object is an array of objects whose type is {@link BulkCharge}
   */
  getBatches(
    options?: GetBatchesOptions,
  ): Promise<PaystackResponse<BulkCharge[]>> {
    return this.client.call(
      "/bulkcharge",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<BulkCharge[]>>;
  }

  /**
   * This method retrieves a specific batch code. It also returns
   * useful information on its progress by way of the `totalCharges`
   * and `pendingCharges` properties in the `PaystackResponse.data`
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
   * @param idOrCode - An ID or code for the charge whose batches you want to retrieve.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of this object is another object whose type is {@link BulkCharge}
   */
  getBatch(idOrCode: string): Promise<PaystackResponse<BulkCharge>> {
    return this.client.call(
      `/bulkcharge/${idOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<BulkCharge>>;
  }

  /**
   * This method retrieves the charges associated with a specified
   * batch code. perPage options are available. You can also
   * filter by status. Charge statuses can be `Status.PENDING`,
   * `Status.SUCCESS` or `Status.FAILED`.
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
   * @param idOrCode - An ID or code for the batch whose charges you want to retrieve.
   * @param options - {@link GetChargesInBatchOptions} lets you customize the data in the
   * response to be returned.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of this object is an array of objects whose type is {@link BulkChargeUnitCharge}
   */
  getChargesInBatch(
    idOrCode: string,
    options?: GetChargesInBatchOptions,
  ): Promise<PaystackResponse<BulkChargeUnitCharge[]>> {
    return this.client.call(
      `/bulkcharge/${idOrCode}/charges`,
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<BulkChargeUnitCharge[]>>;
  }

  /***
   * Use this method to pause a processing batch.
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
   * @param batchCode - The batch code for the bulk charge you want to pause.
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`.
   */
  pauseBatch(batchCode: string): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/bulkcharge/pause/${batchCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Use this method to resume a paused processing batch.
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
   * @param batchCode - The batch code for the bulk charge you want to resume.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`.
   */
  resumeBatch(batchCode: string): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/bulkcharge/resume/${batchCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<undefined>>;
  }
}
