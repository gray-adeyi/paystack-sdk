import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateSubAccountPayload,
  GetSubAccountsOptions,
  UpdateSubAccountPayload,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { SubAccount } from "../types/models.ts";

/**
 * SubAccountClient provides methods that lets you interface with Paystack's
 * Subaccounts API which allows you to create and manage subaccounts on your integration.
 * Subaccounts can be used to split payment between two accounts
 * (your main account and a subaccount). https://paystack.com/docs/api/subaccount/
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
   * @param payload - {@link CreateSubAccountPayload} is the data used to
   * create a subaccount.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link SubAccount}
   */
  create(payload: CreateSubAccountPayload): Promise<
    PaystackResponse<SubAccount>
  > {
    return this.client.call("/subaccount", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<SubAccount>
    >;
  }

  /**
   * Fetch subaccounts available on your integration.
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
   * @param options - {@link GetSubAccountsOptions} lets you customize the
   * data that is returned in the response.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link SubAccount}
   */
  getSubAccounts(
    options?: GetSubAccountsOptions,
  ): Promise<PaystackResponse<SubAccount[]>> {
    return this.client.call(
      "/subaccount",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<SubAccount[]>>;
  }

  /**
   * Get details of a subaccount on your integration.
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
   * @param idOrCode - The subaccount ``ID`` or ``code`` you want to fetch
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link SubAccount}
   */
  getSubAccount(idOrCode: string): Promise<PaystackResponse<SubAccount>> {
    return this.client.call(
      `/subaccount/${idOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<SubAccount>>;
  }

  /**
   * Update a subaccount details on your integration.
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
   * @param idOrCode - The subaccount ``ID`` or ``code`` you want to update
   * @param payload - {@link UpdateSubAccountPayload} is the data used to update
   * the subaccount
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link SubAccount}
   */
  update(
    idOrCode: string,
    payload: UpdateSubAccountPayload,
  ): Promise<PaystackResponse<SubAccount>> {
    return this.client.call(
      `/subaccount/${idOrCode}`,
      HTTPMethod.PUT,
      payload,
    ) as Promise<PaystackResponse<SubAccount>>;
  }
}
