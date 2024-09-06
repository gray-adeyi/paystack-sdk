import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateSubAccountPayload,
  GetSubAccountsOptions,
  UpdateSubAccountPayload,
} from "../types/clients/subAccount.ts";
import { PaystackResponse } from "../types/global.ts";

/**
 * SubAccountClient provides methods that lets you interface with Paystack's
 * Subaccounts API which allows you to create and manage subaccounts on your integration.
 * Subaccounts can be used to split payment between two accounts
 * (your main account and a sub account). https://paystack.com/docs/api/subaccount/
 */
export default class SubAccountClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a SubAccountClient
   *
   * @param secretKey - Your paystack integration secret key.
   * @param client - A custom rest client to use for making api calls to paystack's instead
   * of creating a new one with the secretKey
   */
  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  /**
   * Create a subacount on your integration.
   *
   * @param payload : {@link CreateSubAccountPayload} is the data used to
   * create a sub account.
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: CreateSubAccountPayload): Promise<PaystackResponse> {
    return this.client.call("/subaccount", HTTPMethod.POST, payload);
  }

  /**
   * Fetch subaccounts available on your integration.
   *
   * @param options : {@link GetSubAccountsOptions} lets you customize the
   * data that is returned in the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getSubAccounts(options?: GetSubAccountsOptions):Promise<PaystackResponse> {
    return this.client.call("/subaccount", HTTPMethod.GET, null, options);
  }

  /**
   * Get details of a subaccount on your integration.
   *
   * @param idOrCode : The subaccount ``ID`` or ``code`` you want to fetch
   * @returns A promise containing a {@link PaystackResponse}
   */
  getSubAccount(idOrCode: string): Promise<PaystackResponse> {
    return this.client.call(`/subaccount/${idOrCode}`, HTTPMethod.GET);
  }

  /**
   * Update a subaccount details on your integration.
   *
   * @param idOrCode : The subaccount ``ID`` or ``code`` you want to update
   * @param payload : {@link UpdateSubAccountPayload} is the data used to update
   * the subaccount
   * @returns A promise containing a {@link PaystackResponse}
   */
  update(idOrCode: string, payload: UpdateSubAccountPayload): Promise<PaystackResponse> {
    return this.client.call(`/subaccount/${idOrCode}`, HTTPMethod.PUT, payload);
  }
}
