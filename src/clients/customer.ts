import type { RiskAction } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateCustomerPayload,
  GetCustomersOptions,
  UpdateCustomerPayload,
  ValidatePayload,
} from "../types/clients/customer.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Customer } from "../types/models.ts";

/**
 * CustomerClient provides methods that lets you interface with Paystack's
 * Customers API which allows you to create and manage customers in your integration.
 * https://paystack.com/docs/api/customer/
 */
export default class CustomerClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a CustomerClient
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
   * Create a customer on your integration.
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
   * @param payload - Is a {@link CreateCustomerPayload} containing the customer's
   * information.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Customer}
   */
  create(payload: CreateCustomerPayload): Promise<PaystackResponse<Customer>> {
    return this.client.call("/customer/", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Customer>
    >;
  }

  /**
   * Retrieve customers available on your integration.
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
   * @param options - {@link GetCustomersOptions} lets you customize the data in the
   * response to be returned.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link Customer}
   */
  getCustomers(
    options?: GetCustomersOptions,
  ): Promise<PaystackResponse<Customer[]>> {
    return this.client.call(
      "/customer/",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Customer[]>>;
  }

  /**
   * Get details of a customer in your integration.
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
   * @param emailOrCode - An email or customer code for the customer you want to fetch
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Customer}
   */
  getCustomer(emailOrCode: string): Promise<PaystackResponse<Customer>> {
    return this.client.call(
      `/customer/${emailOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Customer>>;
  }

  /**
   * Update a customer's details on your integration
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
   * @param code - The customer's code
   * @param payload - {@link UpdateCustomerPayload} is the data used to update the
   * customer's details
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Customer}
   */
  update(
    code: string,
    payload: UpdateCustomerPayload,
  ): Promise<PaystackResponse<Customer>> {
    return this.client.call(
      `/customer/${code}`,
      HTTPMethod.PUT,
      payload,
    ) as Promise<PaystackResponse<Customer>>;
  }

  /**
   * Validate a customer's identity
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
   * @param emailOrCode - The email or code of the customer to be validated
   * @param payload - {@link ValidatePayload} is the data used for the validation.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`.
   */
  validate(
    emailOrCode: string,
    payload: ValidatePayload,
  ): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/customer/${emailOrCode}/identification`,
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Whitelist or blacklist a customer on your integration.
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
   * @param emailOrCode - The customer's email address or code.
   * @param riskAction - One of the possible risk actions from the RiskAction enum e.g `RiskAction.DEFAULT`
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Customer}
   */
  flag(
    emailOrCode: string,
    riskAction: RiskAction,
  ): Promise<PaystackResponse<Customer>> {
    return this.client.call("/customer/set_risk_action", HTTPMethod.POST, {
      customer: emailOrCode,
      riskAction,
    }) as Promise<PaystackResponse<Customer>>;
  }

  /**
   * Deactivate an authorization when the card needs to be forgotten
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
   * @param authorizationCode - Authorization code to be deactivated.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  deactivate(authorizationCode: string): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      "/customer/deactivate_authorization",
      HTTPMethod.POST,
      { authorizationCode },
    ) as Promise<PaystackResponse<undefined>>;
  }
}
