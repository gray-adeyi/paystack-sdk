import { Country } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";
import type { GetBanksOptions } from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Bank, PaystackSupportedCountry } from "../types/models.ts";

/**
 * MiscellaneousClient provides methods that lets you interface with Paystack's
 * Miscellaneous API which are supporting APIs that can be used to provide more
 * details to other APIs. https://paystack.com/docs/api/miscellaneous/
 */
export default class MiscellaneousClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a MiscellaneousClient
   *
   * @param secretKey - Your paystack integration secret key.
   * @param client - A custom rest client to use for making api calls to paystack's instead
   *    of creating a new one with the secretKey
   */
  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  /**
   * Get a list of all supported banks and their properties
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param options - {@link GetBanksOptions} lets you customize the data in the
   * response to be returned. the country property is required to retrieve banks
   * in that country supported by Paystack
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link Bank}
   */
  getBanks(options: GetBanksOptions): Promise<
    PaystackResponse<Bank[]>
  > {
    const countryFullNameMap: Record<Country, string> = {
      [Country.NIGERIA]: "nigeria",
      [Country.GHANA]: "ghana",
      [Country.SOUTH_AFRICA]: "south africa",
      [Country.KENYA]: "kenya",
      [Country.COTE_D_IVOIRE]: "côte d'ivoire",
      [Country.EGYPT]: "egypt",
      [Country.RWANDA]: "rwanda",
    };
    const params = { ...options, country: countryFullNameMap[options.country] };
    return this.client.call("/bank", HTTPMethod.GET, null, params) as Promise<
      PaystackResponse<Bank[]>
    >;
  }

  /**
   * Gets a list of Countries that Paystack currently supports
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link PaystackSupportedCountry}
   */
  getCountries(): Promise<
    PaystackResponse<PaystackSupportedCountry[]>
  > {
    return this.client.call("/country", HTTPMethod.GET) as Promise<
      PaystackResponse<PaystackSupportedCountry[]>
    >;
  }

  /**
   * Get a list of states for a country for address verification.
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param country -  The country from which to filter the states
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects with `name`, `slug`,
   * and `abbreviation` as properties
   */
  getStates(country: Country): Promise<
    PaystackResponse<{
      readonly name: string;
      readonly slug: string;
      readonly abbreviation: string;
    }[]>
  > {
    return this.client.call(
      `address_verification/states?country=${country}`,
      HTTPMethod.GET,
    ) as Promise<
      PaystackResponse<{
        readonly name: string;
        readonly slug: string;
        readonly abbreviation: string;
      }[]>
    >;
  }
}
