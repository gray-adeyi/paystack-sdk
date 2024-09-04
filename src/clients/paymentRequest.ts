import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreatePaymentRequestPayload,
  GetPaymentRequestsOptions,
  UpdatePaymentRequestPayload,
} from "../types/clients/paymentRequest.ts";

export default class PaymentRequestClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreatePaymentRequestPayload) {
    return this.client.call("/paymentrequest", HTTPMethod.POST, payload);
  }

  getPaymentRequests(options?: GetPaymentRequestsOptions) {
    return this.client.call("/paymentrequest", HTTPMethod.POST, null, options);
  }

  getPaymentRequest(idOrCode: string) {
    return this.client.call(`/paymentrequest/${idOrCode}`, HTTPMethod.GET);
  }

  verify(code: string) {
    return this.client.call(`/paymentrequest/verify/${code}`, HTTPMethod.GET);
  }

  sendNotification(idOrCode: string) {
    return this.client.call(
      `/paymentrequest/notify/${idOrCode}`,
      HTTPMethod.POST,
    );
  }

  getTotal() {
    return this.client.call("/paymentrequest/totals", HTTPMethod.GET);
  }

  finalize(idOrCode: string) {
    return this.client.call(
      `/paymentrequest/finalize/${idOrCode}`,
      HTTPMethod.GET,
    );
  }

  update(idOrCode: string, payload: UpdatePaymentRequestPayload) {
    return this.client.call(
      `/paymentrequest/${idOrCode}`,
      HTTPMethod.PUT,
      payload,
    );
  }

  archive(idOrCode: string) {
    return this.client.call(
      `/paymentrequest/archive/${idOrCode}`,
      HTTPMethod.POST,
    );
  }
}
