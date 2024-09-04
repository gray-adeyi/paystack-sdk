import { Country } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";
import { GetBanksOptions } from "../types/clients/miscellaneous.ts";

export default class MiscellaneousClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  getBanks(options: GetBanksOptions) {
    return this.client.call("/bank", HTTPMethod.GET, null, options);
  }

  getCountries() {
    return this.client.call("/country", HTTPMethod.GET);
  }

  getStates(country: Country) {
    return this.client.call(
      `address_verification/states?country=${country}`,
      HTTPMethod.GET,
    );
  }
}
