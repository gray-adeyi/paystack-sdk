import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreatePlanPayload,
  GetPlansOptions,
  UpdatePlanPayload,
} from "../types/clients/plan.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Plan } from "../types/models.ts";

/**
 * PlanClient provides methods that lets you interface with Paystack's
 * Plans API which allows you to create and manage installment payment
 * options on your integration. https://paystack.com/docs/api/plan/
 */
export default class PlanClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a PlanClient
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
   * Create a plan on your integration
   *
   * @param payload : {@link CreatePlanPayload} is the data sent to paystack
   * to create a plan.
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: CreatePlanPayload): Promise<
    PaystackResponse<Plan>
  > {
    return this.client.call("/plan", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Plan>
    >;
  }

  /**
   * Fetch plans available on your integration.
   *
   * @param options : {@link GetPlansOptions} lets you customize the data
   * returned in the response
   * @returns A promise containing a {@link PaystackResponse}
   */
  getPlans(options?: GetPlansOptions): Promise<
    PaystackResponse<Plan[]>
  > {
    return this.client.call("/plan", HTTPMethod.GET, null, options) as Promise<
      PaystackResponse<Plan[]>
    >;
  }

  /**
   * Get details of a plan on your integration.

   *
   * @param idOrCode : The plan ID or code.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getPlan(idOrCode: string): Promise<
    PaystackResponse<Plan>
  > {
    return this.client.call(`/plan/${idOrCode}`, HTTPMethod.GET) as Promise<
      PaystackResponse<Plan>
    >;
  }

  /**
   * Update a plan.
   *
   * @param idOrCode : The plan ID or code.
   * @param payload : {@link UpdatePlanPayload} is the data used to update
   * the plan.
   * @returns A promise containing a {@link PaystackResponse}
   */
  update(
    idOrCode: string,
    payload: UpdatePlanPayload,
  ): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/plan/${idOrCode}`,
      HTTPMethod.PUT,
      payload,
    ) as Promise<PaystackResponse<undefined>>;
  }
}
