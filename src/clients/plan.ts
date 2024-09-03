import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreatePlanPayload,
  GetPlansOptions,
  UpdatePlanPayload,
} from "../types/clients/plan.ts";

export default class PlanClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  create(payload: CreatePlanPayload) {
    return this.client.call("/plan", HTTPMethod.POST, payload);
  }

  getPlans(options?: GetPlansOptions) {
    return this.client.call("/plan", HTTPMethod.GET, null, options);
  }

  getPlan(idOrCode: string) {
    return this.client.call(`/plan/${idOrCode}`, HTTPMethod.GET);
  }

  update(idOrCode: string, payload: UpdatePlanPayload) {
    return this.client.call(`/plan/${idOrCode}`, HTTPMethod.PUT, payload);
  }
}
