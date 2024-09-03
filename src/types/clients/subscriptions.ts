import { PaginationOptions } from "../global.ts";

export type CreateSubscriptionPayload = {
  readonly customer: string;
  readonly plan: string;
  readonly authorization?: string;
  readonly startDate?: string;
};

export type GetSubscriptionsOptions = PaginationOptions & {
 readonly customer?: string;
 readonly plan?: string;
}