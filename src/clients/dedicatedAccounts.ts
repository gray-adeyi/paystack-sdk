import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  AssignDedicatedAccountPayload,
  CreateDedicatedAccountPayload,
  GetDedicatedAccountsOptions,
  SplitPayload,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type {
  DedicatedAccount,
  DedicatedAccountProvider,
} from "../types/models.ts";

/**
 * DedicatedAccountClient provides methods that lets you interface with Paystack's
 * Dedicated Virtual Account API
 *
 * The Dedicated Virtual Account API enables Nigerian merchants to manage
 * unique payment accounts of their customers.
 * https://paystack.com/docs/api/dedicated-virtual-account/
 */
export default class DedicatedAccountClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a DedicatedAccountClient
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
   * Created a dedicated virtual account for an existing customer.
   *
   * @remarks This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
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
   * @param payload - {@link CreateDedicatedAccountPayload} is the data used to
   * create the dedicated virtual account.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of this object is another object whose type is {@link DedicatedAccount}
   */
  create(
    payload: CreateDedicatedAccountPayload,
  ): Promise<PaystackResponse<DedicatedAccount>> {
    return this.client.call(
      "/dedicated_account",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<DedicatedAccount>>;
  }

  /**
   * Create a customer, validate the customer, and assign a DVA to the customer.
   *
   * @remarks
   *
   * This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
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
   * @param payload - The data sent to paystack.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  assign(
    payload: AssignDedicatedAccountPayload,
  ): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      "/dedicated_account/assign",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Fetches dedicated virtual accounts available on your integration.
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
   * @param options - {@link GetDedicatedAccountsOptions} lets you customize
   * the array of dedicated accounts returned in the PaystackResponse.data.
   * It requires the `active` flag in the options which lets you filter by
   * active dedicated accounts.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is
   * {@link DedicatedAccount}
   */
  getDedicatedAccounts(
    options?: GetDedicatedAccountsOptions,
  ): Promise<PaystackResponse<DedicatedAccount[]>> {
    return this.client.call(
      "/dedicated_account",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<DedicatedAccount[]>>;
  }

  /**
   * Get details of a dedicated virtual account on your integration.
   *
   * @remarks
   *
   * This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
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
   * @param dedicatedAccountId - ID of the dedicated virtual account.
   * @returns A promise that resolves an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link DedicatedAccount}
   */
  getDedicatedAccount(
    dedicatedAccountId: string,
  ): Promise<PaystackResponse<DedicatedAccount>> {
    return this.client.call(
      `/dedicated_account/${dedicatedAccountId}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<DedicatedAccount>>;
  }

  /**
   * Requery Dedicated Virtual Account for new transactions
   *
   * @remarks
   *
   * This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
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
   * @param accountNumber - Virtual account number to requery
   * @param providerSlug - The bank's slug in lowercase, without spaces.
   * e.g. wema-bank
   * @param date - The day the transfer was made in YYYY-MM-DD ISO format.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`.
   */
  requery(
    accountNumber: string,
    providerSlug: string,
    date?: string,
  ): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      "dedicated_account",
      HTTPMethod.GET,
      null,
      { accountNumber, providerSlug, date },
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Deactivate a dedicated virtual account on your integration.
   *
   * @remarks
   *
   * This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
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
   * @param dedicatedAccountId - ID of the dedicated virtual account.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link DedicatedAccount}
   */
  deactivate(
    dedicatedAccountId: string,
  ): Promise<PaystackResponse<DedicatedAccount>> {
    return this.client.call(
      `dedicated_account/${dedicatedAccountId}`,
      HTTPMethod.DELETE,
    ) as Promise<PaystackResponse<DedicatedAccount>>;
  }

  /**
   * Split a dedicated virtual account transaction with one or more accounts
   *
   * @remarks
   *
   * This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
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
   * @param payload - {@link SplitPayload}
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link DedicatedAccount}
   */
  split(payload: SplitPayload): Promise<PaystackResponse<DedicatedAccount>> {
    return this.client.call(
      "/dedicated_account/split",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<DedicatedAccount>>;
  }

  /**
   * Removes a split.
   *
   * If you've previously set up split payment for transactions on a
   * dedicated virtual account, you can remove it with this method.
   *
   * @remarks
   *
   * This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
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
   * @param accountNumber - Dedicated virtual account number
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link DedicatedAccount}
   */
  removeSplit(
    accountNumber: string,
  ): Promise<PaystackResponse<DedicatedAccount>> {
    return this.client.call(
      "/dedicated_account/split",
      HTTPMethod.DELETE,
      { accountNumber },
    ) as Promise<PaystackResponse<DedicatedAccount>>;
  }

  /**
   * Get available bank providers for a dedicated virtual account
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
   * The data property of the object is an array of objects whose type is {@link DedicatedAccountProvider}
   */
  getProviders(): Promise<PaystackResponse<DedicatedAccountProvider[]>> {
    return this.client.call(
      "/dedicated_account/available_providers",
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<DedicatedAccountProvider[]>>;
  }
}
