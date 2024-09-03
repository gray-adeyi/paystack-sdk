import RestClient, { HTTPMethod } from "../restClient.ts";
import { GetSettlementsOptions, GetSettlementTransactionsOptions } from "../types/clients/settlements.ts";



export default class SettlementClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  getSettlements(options?: GetSettlementsOptions){
    return this.client.call('/settlement',HTTPMethod.GET,null,options)
  }

  getSettlementTransactions(id: string, options?: GetSettlementTransactionsOptions){
    return this.client.call(`/settlement/${id}/transactions`,HTTPMethod.GET,null,options)
  }
}
