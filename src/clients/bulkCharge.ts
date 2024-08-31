import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  BulkChargeInstruction,
  GetBatchesOptions,
  GetChargesInBatchOptions,
} from "../types/clients/bulkCharge.ts";

export default class BulkChargeClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  initiate(payload: BulkChargeInstruction[]) {
    return this.client.call("/bulkcharge", HTTPMethod.POST, payload);
  }

  getBatches(options?: GetBatchesOptions) {
    return this.client.call("/bulkcharge", HTTPMethod.GET, null, options);
  }

  getBatch(idOrCode: string) {
    return this.client.call(`/bulkcharge/${idOrCode}`, HTTPMethod.GET);
  }

  getChargesInBatch(idOrCode: string, options: GetChargesInBatchOptions) {
    return this.client.call(
      `/bulkcharge/${idOrCode}/charges`,
      HTTPMethod.GET,
      null,
      options,
    );
  }

  pauseBatch(batchCode: string) {
    return this.client.call(`/bulkcharge/pause/${batchCode}`, HTTPMethod.GET);
  }

  resumeBatch(batchCode: string) {
    return this.client.call(`/bulkcharge/resume/${batchCode}`, HTTPMethod.GET);
  }
}
