import type { Reason } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";

export default class TransferControlClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  checkBalance() {
    return this.client.call("/balance", HTTPMethod.GET);
  }

  getBalanceLedger() {
    return this.client.call("/balance/ledger", HTTPMethod.GET);
  }

  resendOtp(transferCode: string, reason: Reason) {
    return this.client.call("/transfer/resend_otp", HTTPMethod.POST, {
      transferCode,
      reason,
    });
  }

  disableOtp() {
    return this.client.call("/transfer/disable_otp", HTTPMethod.POST);
  }

  finalizeDisableOtp(otp: string) {
    return this.client.call("/transfer/disable_otp_finalize", HTTPMethod.POST, {
      otp,
    });
  }

  enableOtp() {
    return this.client.call("/transfer/enable_otp/", HTTPMethod.POST);
  }
}
