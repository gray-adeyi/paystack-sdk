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
   * @param payload - {@link CreatePlanPayload} is the data sent to paystack
   * to create a plan.
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Plan}
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
   * @param options - {@link GetPlansOptions} lets you customize the data
   * returned in the response
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link Plan}
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
   * @param idOrCode - The plan ID or code.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Plan}
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
   * @param idOrCode - The plan ID or code.
   * @param payload - {@link UpdatePlanPayload} is the data used to update
   * the plan.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
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
