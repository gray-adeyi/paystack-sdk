import type { RiskAction } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateCustomerPayload,
  GetCustomersOptions,
  UpdateCustomerPayload,
  ValidatePayload,
} from "../types/clients/customer.ts";
import type { PaystackResponse } from "../types/global.ts";
import type {Customer} from "../types/models.ts";

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
   * @param payload : Is a {@link CreateCustomerPayload} containing the customer's
   * information.
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: CreateCustomerPayload) {
    return this.client.call("/customer/", HTTPMethod.POST, payload) as Promise<PaystackResponse<Customer>>;
  }

  /**
   * Retrieve customers available on your integration.
   *
   * @param options : {@link GetCustomersOptions} let's you customize the data in the
   * response to be returned.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getCustomers(options?: GetCustomersOptions) {
    return this.client.call("/customer/", HTTPMethod.GET, null, options) as Promise<PaystackResponse<Customer[]>>;
  }

  /**
   * Get details of a customer in your integration.
   *
   * @param emailOrCode : An email or customer code for the customer you want to fetch
   * @returns A promise containing a {@link PaystackResponse}
   */
  getCustomer(emailOrCode: string) {
    return this.client.call(`/customer/${emailOrCode}`, HTTPMethod.GET) as Promise<PaystackResponse<Customer>>;
  }

  /**
   * Update a customer's details on your integration
   *
   * @param code : The customer's code
   * @param payload {@link UpdateCustomerPayload} is the data used to update the
   * customer's details
   * @returns A promise containing a {@link PaystackResponse}
   */
  update(
    code: string,
    payload: UpdateCustomerPayload,
  ) {
    return this.client.call(`/customer/${code}`, HTTPMethod.PUT, payload) as Promise<PaystackResponse<Customer>>;
  }

  /**
   * Validate a customer's identity
   *
   * @param emailOrCode : The email or code of the customer to be validated
   * @param payload : {@link ValidatePayload} is the data used for the validation.
   * @returns A promise containing a {@link PaystackResponse}
   */
  validate(
    emailOrCode: string,
    payload: ValidatePayload,
  ) {
    return this.client.call(
      `/customer/${emailOrCode}/identification`,
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Whitelist or blacklist a customer on your integration.
   *
   * @param emailOrCode : The customer's email address or code.
   * @param riskAction : One of the possible risk actions from the RiskAction enum e.g `RiskAction.DEFAULT`
   * @returns A promise containing a {@link PaystackResponse}
   */
  flag(emailOrCode: string, riskAction: RiskAction) {
    return this.client.call("/customer/set_risk_action", HTTPMethod.POST, {
      customer: emailOrCode,
      riskAction,
    }) as Promise<PaystackResponse<Customer>>;
  }

  /**
   * Deactivate an authorization when the card needs to be forgotten
   *
   * @param authorizationCode : Authorization code to be deactivated.
   * @returns A promise containing a {@link PaystackResponse}
   */
  deactivate(authorizationCode: string) {
    return this.client.call(
      "/customer/deactivate_authorization",
      HTTPMethod.POST,
      { authorizationCode },
    ) as Promise<PaystackResponse<undefined>>;
  }
}
