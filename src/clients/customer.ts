import type { RiskAction } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateCustomerPayload,
  GetCustomersOptions,
  UpdateCustomerPayload,
  ValidatePayload,
} from "../types/clients/customer.ts";
import type { PaystackResponse } from "../types/global.ts";

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
  create(payload: CreateCustomerPayload): Promise<PaystackResponse> {
    return this.client.call("/customer/", HTTPMethod.POST, payload);
  }

  /**
   * Retrieve customers available on your integration.
   *
   * @param options : {@link GetCustomersOptions} let's you customize the data in the
   * response to be returned.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getCustomers(options?: GetCustomersOptions): Promise<PaystackResponse> {
    return this.client.call("/customer/", HTTPMethod.GET, null, options);
  }

  /**
   * Get details of a customer in your integration.
   *
   * @param emailOrCode : An email or customer code for the customer you want to fetch
   * @returns A promise containing a {@link PaystackResponse}
   */
  getCustomer(emailOrCode: string): Promise<PaystackResponse> {
    return this.client.call(`/customer/${emailOrCode}`, HTTPMethod.GET);
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
  ): Promise<PaystackResponse> {
    return this.client.call(`/customer/${code}`, HTTPMethod.PUT, payload);
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
  ): Promise<PaystackResponse> {
    return this.client.call(
      `/customer/${emailOrCode}/identification`,
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Whitelist or blacklist a customer on your integration.
   *
   * @param emailOrCode : The customer's email address or code.
   * @param riskAction : One of the possible risk actions from the RiskAction enum e.g `RiskAction.DEFAULT`
   * @returns A promise containing a {@link PaystackResponse}
   */
  flag(emailOrCode: string, riskAction: RiskAction): Promise<PaystackResponse> {
    return this.client.call("/customer/set_risk_action", HTTPMethod.POST, {
      customer: emailOrCode,
      riskAction,
    });
  }

  /**
   * Deactivate an authorization when the card needs to be forgotten
   *
   * @param authCode : Authorization code to be deactivated.
   * @returns A promise containing a {@link PaystackResponse}
   */
  deactivate(authCode: string): Promise<PaystackResponse> {
    return this.client.call(
      "/customer/deactivate_authorization",
      HTTPMethod.POST,
      { authCode },
    );
  }
}
