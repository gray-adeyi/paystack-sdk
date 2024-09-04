import RestClient, { HTTPMethod } from "../restClient.ts";

export default class IntegrationClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  getPaymentSessionTimeout(){
    return this.client.call('/integration/payment_session_timeout', HTTPMethod.GET)
  }

  updatePaymentSessionTimeout(timeout: number){
    return this.client.call('/integration/payment_session_timeout', HTTPMethod.PUT, {timeout})
  }
}