import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreatePayload,
  GetTransferRecipientsOptions,
  Recipient,
} from "../types/clients/transferRecipient.ts";

export default class TransferRecipientClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreatePayload) {
    return this.client.call("/transferrecipient", HTTPMethod.POST, payload);
  }

  bulkCreate(batch: Recipient[]) {
    return this.client.call("/transferrecipient/bulk", HTTPMethod.POST, {
      batch,
    });
  }

  getTransferRecipients(options?: GetTransferRecipientsOptions) {
    return this.client.call(
      "/transferrecipient",
      HTTPMethod.GET,
      null,
      options,
    );
  }

  getTransferRecipient(idOrCode: string) {
    return this.client.call(`/transferrecipient/${idOrCode}`, HTTPMethod.GET);
  }

  update(idOrCode: string, name: string, email?: string) {
    return this.client.call(`/transferrecipient/${idOrCode}`, HTTPMethod.PUT, {
      name,
      email,
    });
  }

  delete(idOrCode: string) {
    return this.client.call(
      `/transferrecipient/${idOrCode}`,
      HTTPMethod.DELETE,
    );
  }
}
