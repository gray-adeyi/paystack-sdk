export type ChargePayload = {
  readonly email: string;
  readonly amount: number;
  // deno-lint-ignore no-explicit-any
  readonly bank?: Record<string, any>;
  // deno-lint-ignore no-explicit-any
  readonly bankTransfer?: Record<string, any>;
  readonly authCode?: string;
  readonly pin?: string;
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
  readonly readonly?: string;
  // deno-lint-ignore no-explicit-any
  readonly ussd?: Record<string, any>;
  // deno-lint-ignore no-explicit-any
  readonly mobileMoney?: Record<string, any>;
  readonly deviceId?: string;
};

export type SubmitAddressPayload = {
  readonly address: string;
  readonly reference: string;
  readonly city: string;
  readonly state: string;
  readonly zipcode: string;
};
