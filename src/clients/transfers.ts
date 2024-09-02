import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetTransferOptions,
  InitiatePayload,
  TransferInstruction,
} from "../types/clients/transfers.ts";

export default class TransferClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  initiate(payload: InitiatePayload) {
    return this.client.call("/transfer", HTTPMethod.POST, payload);
  }

  finalize(transferCode: string, otp: string) {
    return this.client.call("/transfer/finalize_transfer", HTTPMethod.POST, {
      transferCode,
      otp,
    });
  }

  bulkTransfer(transfers: TransferInstruction[], source = "balance") {
    return this.client.call("transfer/bulk", HTTPMethod.POST, {
      transfers,
      source,
    });
  }

  getTransfers(options?: GetTransferOptions) {
    return this.client.call("/transfer", HTTPMethod.GET, null, options);
  }

  getTransfer(idOrCode: string) {
    return this.client.call(`/transfer/${idOrCode}/`, HTTPMethod.GET);
  }

  verify(reference: string) {
    return this.client.call(`transfer/verify/${reference}`, HTTPMethod.GET);
  }
}
