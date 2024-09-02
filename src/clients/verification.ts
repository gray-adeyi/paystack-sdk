import RestClient, { HTTPMethod } from "../restClient.ts";
import type { ValidateAccountPayload } from "../types/clients/verification.ts";

export default class VerificationClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  resolveAccountNumber(accountNumber: string, bankCode: string) {
    return this.client.call(
      `/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      HTTPMethod.GET,
    );
  }

  validateAccount(payload: ValidateAccountPayload) {
    return this.client.call("/bank/validate", HTTPMethod.POST, payload);
  }

  resolveCardBin(bin: string) {
    return this.client.call(`/decision/bin/${bin}`, HTTPMethod.GET);
  }
}
