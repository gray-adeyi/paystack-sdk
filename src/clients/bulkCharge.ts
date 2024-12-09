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
   * Initiate a bulk charge
   *
   * @param payload : A array of {@link BulkChargeInstruction}, each containing individual
   * charges to be charged.
   * @returns A promise containing a {@link PaystackResponse}
   */
  initiate(payload: BulkChargeInstruction[]) {
    return this.client.call("/bulkcharge", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<BulkCharge>
    >;
  }
  /**
   * Retrieves all bulk charge batches created by the integration.
   *
   * @param options :{@link GetBatchesOptions} let's you customize the data in the
   * response to be returned.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getBatches(options?: GetBatchesOptions) {
    return this.client.call(
      "/bulkcharge",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<BulkCharge[]>>;
  }

  /**
   * This method retrieves a specific batch code. It also returns
   * useful information on its progress by way of the totalCharges
   * and pendingCharges properties in the PaystackResponse.data
   *
   * @param idOrCode : An ID or code for the charge whose batches you want to retrieve.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getBatch(idOrCode: string) {
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
   * @param idOrCode : An ID or code for the batch whose charges you want to retrieve.
   * @param options: {@link GetChargesInBatchOptions} let's you customize the data in the
   * response to be returned.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getChargesInBatch(
    idOrCode: string,
    options?: GetChargesInBatchOptions,
  ) {
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
   * @param batchCode: The batch code for the bulk charge you want to pause.
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  pauseBatch(batchCode: string) {
    return this.client.call(
      `/bulkcharge/pause/${batchCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Use this method to resume a paused processing batch.
   *
   * @param batchCode : The batch code for the bulk charge you want to resume.
   * @returns A promise containing a {@link PaystackResponse}
   */
  resumeBatch(batchCode: string) {
    return this.client.call(
      `/bulkcharge/resume/${batchCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<undefined>>;
  }
}
