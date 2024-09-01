export type ChargePayload = {
  readonly email: string;
  readonly amount: number;
  readonly bank?: Record<string, any>;
  readonly bankTransfer?: Record<string, any>;
  readonly authCode?: string;
  readonly pin?: string;
  readonly metadata?: Record<string, any>;
  readonly readonly?: string;
  readonly ussd?: Record<string, any>;
  readonly mobileMoney?: Record<string, any>;
  readonly deviceId?: string;
};

export type SetAddressPayload = {
  readonly address: string;
  readonly reference: string;
  readonly city: string;
  readonly state: string;
  readonly zipcode: string;
};
