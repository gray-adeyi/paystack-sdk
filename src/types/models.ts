// deno-lint-ignore-file no-explicit-any
import type { Country } from "../enums.ts";
import type { Currency, Domain, Interval, RiskAction } from "../enums.ts";
import type { LineItem, Tax } from "./clients/index.ts";
import type { BulkChargeStatus } from "../enums.ts";
import {
  DisputeStatus,
  PaystackIntegrationType,
  PaystackPaymentMethod,
  SupportedCountryRelationshipType,
} from "../enums.ts";

export type ApplePayDomains = {
  domainNames: string[];
};

export type BulkCharge = {
  readonly batchCode: string;
  readonly reference?: string;
  readonly id: number;
  readonly integration?: number;
  readonly domain: Domain;
  readonly status: BulkChargeStatus;
  readonly totalCharges?: number;
  readonly pendingCharges?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type BulkChargeUnitCharge = {
  readonly integration: number;
  readonly bulkcharge: number;
  readonly customer: Customer;
  readonly authorization: Authorization;
  readonly transaction: Transaction;
  readonly domain: Domain;
  readonly amount: number;
  readonly currency: Currency;
  readonly status: string; // TODO: find bulk charge unit charge status types
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type Customer = {
  readonly integration: number;
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly customerCode: string;
  readonly phone: string;
  // deno-lint-ignore no-explicit-any
  readonly metadata: Record<string, any>;
  readonly riskAction: RiskAction;
  readonly internationalPhoneFormat?: string | null;
  readonly identified?: boolean;
  // deno-lint-ignore no-explicit-any
  readonly identifications?: any | null;
  readonly transactions?: Transaction[];
  readonly subscriptions?: Subscription[];
  readonly authorizations?: Authorization[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly totalTransactions?: number;
  // deno-lint-ignore no-explicit-any
  readonly totalTransactionValue?: Array<any>;
  readonly dedicatedAccount?: string | null;
  readonly dedicatedAccounts?: Array<any>;
};

export type Authorization = {
  readonly authorizationCode: string;
  readonly bin: string;
  readonly last4: string;
  readonly expMonth: string;
  readonly expYear: string;
  readonly channel: string;
  readonly cardType: string;
  readonly bank: string;
  readonly countryCode: Country;
  readonly brand: string;
  readonly reusable: boolean;
  readonly accountName: string;
};

export type InitTransaction = {
  readonly authorizationUrl: string;
  readonly accessCode: string;
  readonly reference: string;
};

export type TransactionHistory = {
  readonly type: string;
  readonly message: string;
  readonly time: number;
};

export type TransactionLog = {
  readonly startTime: 1724318098;
  readonly timeSpent: 4;
  readonly attempts: 1;
  readonly errors: 0;
  readonly success: true;
  readonly mobile: false;
  // deno-lint-ignore no-explicit-any
  readonly input: Array<any>;
  readonly history: TransactionHistory[];
};

export type TransactionTotal = {
  readonly totalTransactions: number;
  readonly "totalVolume": number;
  readonly totalVolumeByCurrency: Money[];
  readonly pendingTransfers: number;
  readonly pendingTransfersByCurrency: Money[];
};

export type TransactionExport = {
  readonly path: string;
  readonly expiresAt: string;
};

export type Transaction = {
  readonly id: number;
  readonly domain: Domain;
  readonly status: string;
  readonly reference: string;
  readonly amount: number;
  readonly message: string | null;
  readonly gatewayResponse: string;
  readonly paidAt: string;
  readonly channel: string;
  readonly currency: Currency;
  readonly ipAddress: string | null;
  // deno-lint-ignore no-explicit-any
  readonly metadata: Record<string, any>;
  readonly log: TransactionLog | null;
  readonly fees: number | null;
  readonly feesSplit: null;
  readonly customer: Customer | Record<string, never>;
  readonly authorization: Authorization | Record<string, never>;
  readonly plan: Plan | Record<string, never>;
  readonly split: TransactionSplit | Record<string, never>;
  readonly subaccount: SubAccount | Record<string, never>;
  readonly orderId: string | null;
  readonly createdAt: "2017-02-04T06:05:02.000Z";
  readonly requestedAmount: number;
  readonly source: {
    readonly "source": "merchant_api";
    readonly "type": "api";
    readonly "identifier": null;
    readonly "entryPoint": "charge";
  };
  readonly connect: null;
  readonly posTransactionData: null;
};

export type TransactionSplit = {
  id: number;
  name: string;
  type: string; // TODO: Find the supported types for splits
  currency: Currency;
  integration: number;
  domain: Domain;
  splitCode: string;
  active: boolean;
  bearerType: string;
  bearerSubaccount: string | null;
  createdAt: string;
  updatedAt: string;
  isDynamic: boolean;
  readonly subaccounts: {
    readonly subaccount: SubAccount;
    readonly share: number;
  }[];
  totalSubaccounts: number;
};

export type Subscription = {
  readonly customer: number | Customer;
  readonly plan: number | Plan;
  readonly integration: number;
  readonly domain: Domain;
  readonly start: number;
  readonly status: string; // TODO: find all the supported status for subscription
  readonly quantity: number;
  readonly amount: number;
  readonly subscriptionCode: string;
  readonly emailToken: string;
  readonly authorization: number | Authorization;
  readonly easyCronId: string | null;
  readonly cronExpression: string;
  readonly nextPaymentDate: string | null;
  readonly openInvoice: any | null;
  readonly invoiceLimit: number;
  readonly id: number;
  readonly splitCode: string | null;
  readonly cancelledAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly paymentsCount?: number;
  readonly mostRecentInvoice?: Invoice | null;
  readonly canceledAt?: string;
  readonly invoices?: Invoice[];
  readonly invoicesHistory?: Array<any>;
};

export type Invoice = {
  readonly subscription: number;
  readonly integration: number;
  readonly domain: Domain;
  readonly invoiceCode: string;
  readonly customer: number;
  readonly transaction: number;
  readonly amount: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly status: string; // Find all invoice types
  readonly paid: number | boolean;
  readonly retries: number;
  readonly authorization: number;
  readonly paidAt: string;
  readonly nextNotification: string;
  readonly notificationFlag: any | null;
  readonly description: string | null;
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type PaymentPage = {
  readonly integration: string;
  readonly plan: string | null;
  readonly domain: Domain;
  readonly name: string;
  readonly description: string | null;
  readonly amount: number | null;
  readonly currency: Currency;
  readonly slug: string;
  // deno-lint-ignore no-explicit-any
  readonly customFields: Record<string, any> | null; // TODO: find customFields type
  readonly type: string;
  readonly redirectUrl: string | null;
  readonly successMessage: string | null;
  readonly collectPhone: boolean;
  readonly active: boolean;
  readonly published: boolean;
  readonly migrate: boolean;
  readonly notificationEmail: string | null;
  // deno-lint-ignore no-explicit-any
  readonly metadata: Record<string, any> | null;
  readonly splitCode: string | null;
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly products?: Product[];
};

export type PaymentRequest = {
  readonly id: number;
  readonly integration: number;
  readonly domain: Domain;
  readonly amount: number;
  readonly currency: Currency;
  readonly dueDate: string | null;
  readonly hasInvoice: boolean | null;
  readonly invoiceNumber: string | null;
  readonly description: string | null;
  readonly pdfUrl: string | null;
  readonly lineItems: LineItem[];
  readonly tax: Tax[];
  readonly requestCode: string;
  readonly status: string; // TODO: find all the payment request status
  readonly paid: boolean;
  readonly paidAt: string | null;
  // deno-lint-ignore no-explicit-any
  readonly metadata: Record<string, any> | null;
  // deno-lint-ignore no-explicit-any
  readonly notifications: {
    readonly sentAt: string;
    readonly channel: string; // TODO: find all the supported channels for notifications
  }[];
  readonly offlineReference: string;
  readonly customer: Customer;
  readonly createdAt: string;
  readonly discount: string | null;
  readonly splitCode: string | null;
  readonly transactions?: Transaction[];
  readonly archived?: boolean;
  readonly source?: string;
  readonly paymentMethod?: any | null;
  readonly note?: any | null;
  readonly amountPaid?: number | null;
  readonly updatedAt?: string;
  readonly pendingAmount?: number;
};

export type Money = {
  readonly currency: Currency;
  readonly amount: number;
};

export type PaymentRequestStat = {
  readonly pending: Money[];
  readonly successful: Money[];
  readonly total: Money[];
};

export type PlanSubscriber = {
  readonly customerCode: string;
  readonly customerFirstName: string;
  readonly customerLastName: string;
  readonly customerEmail: string;
  readonly subscriptionStatus: string; // TODO: find all subscription status types
  readonly currency: Currency;
  readonly customerTotalAmountPaid: number;
};

export type Plan = {
  readonly subscriptions: Subscription[];
  readonly pages: PaymentPage[];
  readonly domain: Domain;
  readonly name: string;
  readonly plan_code: string;
  readonly description: string | null;
  readonly amount: number;
  readonly interval: Interval;
  readonly invoiceLimit: number;
  readonly sendInvoices: boolean;
  readonly sendSms: boolean;
  readonly hostedPage: boolean;
  readonly hostedPageUrl: string | null;
  readonly hostedPageSummary: string | null;
  readonly currency: Currency;
  readonly migrate: boolean;
  readonly isDeleted: boolean;
  readonly isArchived: boolean;
  readonly id: number;
  readonly integration: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly totalSubscriptions?: number;
  readonly activeSubscriptions?: number;
  readonly totalSubscriptionsRevenue?: number;
  readonly pagesCount?: number;
  readonly subscribersCount?: number;
  readonly subscriptionsCount?: number;
  readonly activeSubscriptionsCount?: number;
  readonly totalRevenue?: number;
  readonly subscribers?: PlanSubscriber[];
};

export type SubAccount = {
  readonly id: number;
  readonly subaccountCode: string;
  readonly businessName: string;
  readonly description: string | null;
  readonly primaryContactName: string | null;
  readonly primaryContactEmail: string | null;
  readonly primaryContactPhone: string | null;
  // deno-lint-ignore no-explicit-any
  readonly metadata: Record<string, any> | null;
  readonly percentageCharge: number;
  readonly settlementBank: string;
  readonly bankId: number;
  readonly accountNumber: string;
  readonly currency: Currency;
  readonly active: number | boolean;
  readonly isVerified: boolean;
  readonly integration?: number;
  readonly bank?: string;
  readonly managedByIntegration?: number;
  readonly domain?: Domain;
  readonly migrate?: boolean;
  readonly accountName?: string;
  readonly product?: string;
};

export type Product = {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
  readonly productCode: string;
  readonly slug: string;
  readonly currency: Currency;
  readonly price: number;
  readonly quantity: number;
  readonly quantitySold: number;
  readonly active: boolean;
  readonly domain: Domain;
  readonly type: string;
  readonly inStock: boolean;
  readonly unlimited: boolean;
  // deno-lint-ignore no-explicit-any
  readonly metadata: Record<string, any> | null;
  // deno-lint-ignore no-explicit-any
  readonly files: Array<any>; // TODO: find the type of files
  readonly filePath?: string | null;
  readonly successMessage: string | null;
  readonly redirectUrl: string | null;
  readonly splitCode: string | null;
  // deno-lint-ignore no-explicit-any
  readonly notificationEmails: Array<any> | null;
  readonly minimumOrderable: number;
  readonly maximumOrderable: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly features?: any | null;
  // deno-lint-ignore no-explicit-any
  readonly digitalAssets: Array<any>; // TODO: find the type of digitalAssets
  // deno-lint-ignore no-explicit-any
  readonly variantOptions: Array<any>; // TODO: find the type of variantOptions
  readonly isShippable: boolean;
  // deno-lint-ignore no-explicit-any
  readonly shippingFields: Record<string, any>;
  readonly integration: number;
  readonly lowStockAlert: number | boolean;
  readonly stockThreshold?: any | null;
  readonly expiresIn?: any | null;
};

export type Terminal = {
  readonly id: number;
  readonly serialNumber: string | null;
  readonly deviceMake: string | null;
  readonly terminalId: string;
  readonly integration: number;
  readonly domain: Domain;
  readonly name: string;
  readonly address: string | null;
  readonly status: string | null; // TODO: Find all the supported status
};

export type DedicatedAccount = {
  readonly bank: {
    readonly name: string;
    readonly id: number;
    readonly slug: string;
  };
  readonly accountName: string;
  readonly accountNumber: string;
  readonly assigned: boolean;
  readonly currency: Currency;
  // deno-lint-ignore no-explicit-any
  readonly metadata: Record<string, any> | null;
  readonly active: boolean;
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly assignment: {
    integration: number;
    assigneeId: number;
    assigneeType: string;
    expired: boolean;
    accountType: string;
    readonly assignedAt: string;
  };
  readonly customer: Customer;
  readonly splitConfig?: {
    readonly subaccount: string;
  } | Record<string, never>;
};

export type DedicatedAccountProvider = {
  readonly providerSlug: string;
  readonly bankId: number;
  readonly bankName: string;
  readonly id: number;
};

export type Settlement = {
  readonly id: number;
  readonly domain: Domain;
  readonly status: string; // TODO find all the supported status for settlement
  readonly currency: Currency;
  readonly integration: number;
  readonly totalAmount: number;
  readonly effectiveAmount: number;
  readonly totalFees: number;
  readonly totalProcessed: number;
  readonly deductions: any | null;
  readonly settlementDate: string;
  readonly settledBy: any | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type TransferRecipient = {
  readonly active: boolean;
  readonly createdAt: string;
  readonly currency: Currency;
  readonly description: string | null;
  readonly domain: Domain;
  readonly email: string | null;
  readonly id: number;
  readonly integration: number;
  readonly metadata: Record<string, any> | null;
  readonly name: string;
  readonly recipientCode: string;
  readonly type: string; // TODO: Find out all the supported types
  readonly updatedAt: string;
  readonly isDeleted: boolean;
  readonly recipientAccount?: string;
  readonly institutionCode?: string;
  readonly details: {
    authorizationCode?: number | null;
    readonly accountNumber: string;
    readonly accountName: string;
    readonly bankCode: string;
    readonly bankName: string;
  };
};

export type Transfer = {
  readonly integration: number;
  readonly domain: Domain;
  readonly amount: number;
  readonly currency: Currency;
  readonly source: string;
  readonly sourceDetails?: any | null;
  readonly failures?: any | null;
  readonly titanCode?: any | null;
  readonly transferredAt?: string | null;
  readonly reference?: string;
  readonly request?: number;
  readonly reason: string;
  readonly recipient: number | TransferRecipient;
  readonly status: string; // TODO: find all the supported status for transfer
  readonly transferCode: string;
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly session?: {
    readonly provider: any | null;
    readonly id: any | null;
  };
  readonly feeCharged?: number;
  readonly feesBreakdown?: any | null;
  readonly gatewayResponse?: any | null;
};

export type BulkTransferItem = {
  readonly reference: string;
  readonly recipient: string;
  readonly amount: number;
  readonly transferCode: string;
  readonly currency: Currency;
  readonly status: string; // TODO: find all the supported status for transfer
};

export type BalanceLedgerItem = {
  readonly integration: number;
  readonly domain: Domain;
  readonly balance: number;
  readonly currency: Currency;
  readonly difference: number;
  readonly reason: string;
  readonly modelResponsible: string;
  readonly modelRow: number;
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type DisputeHistory = {
  readonly status: DisputeStatus;
  readonly by: string;
  readonly createdAt: string;
};

export type DisputeMessage = {
  readonly sender: string;
  readonly body: string;
  readonly createdAt: string;
};

export type Dispute = {
  readonly id: number;
  readonly refundAmount: number | null;
  readonly currency: Currency | null;
  readonly status: DisputeStatus;
  readonly resolution: any | null;
  readonly domain: Domain;
  readonly transaction: Transaction;
  readonly transactionReference: string | null;
  readonly category: any | null;
  readonly customer: Customer;
  readonly bin: string | null;
  readonly last4: string | null;
  readonly dueAt: string | null;
  readonly resolvedAt: string | null;
  readonly evidence: any | null;
  readonly attachments: any;
  readonly note: any | null;
  readonly history: DisputeHistory[];
  readonly messages: DisputeMessage[];
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type DisputeEvidence = {
  readonly customerEmail: string;
  readonly customerName: string;
  readonly customerPhone: string;
  readonly serviceDetails: string;
  readonly deliveryAddress: string;
  readonly dispute: number;
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type DisputeUploadInfo = {
  readonly signedUrl: string;
  readonly fileName: string;
};

export type DisputeExportInfo = {
  readonly path: string;
  readonly expiresAt: string;
};

export type Refund = {
  readonly integration: number;
  readonly transaction: number;
  readonly dispute: any | null;
  readonly settlement: any | null;
  readonly id: number;
  readonly domain: Domain;
  readonly currency: Currency;
  readonly amount: number;
  readonly status: string; // TODO: find all the status types
  readonly refundedAt: string | null;
  readonly refundedBy: string;
  readonly customerNote: string;
  readonly merchantNote: string;
  readonly deductedAmount: number;
  readonly fullyDeducted: number | boolean;
  readonly createdAt: string;
  readonly bankReference: any | null;
  readonly transactionReference: string;
  readonly reason: string;
  readonly customer: Customer;
  readonly refundType: string;
  readonly transactionAmount: number;
  readonly initiatedBy: string;
  readonly refundChannel: string;
  readonly sessionId: any | null;
  readonly collectAccountNumber: boolean;
};

export type CardBin = {
  readonly bin: string;
  readonly brand: string;
  readonly subBrand: string;
  readonly countryCode: Country;
  readonly countryName: string;
  readonly cardType: string;
  readonly bank: string;
  readonly linkedBankId: number;
};

export type Bank = {
  readonly name: string;
  readonly slug: string;
  readonly code: string;
  readonly longcode: string;
  readonly gateway: string | null;
  readonly payWithBank: boolean;
  readonly supportsTransfer: boolean;
  readonly active: boolean;
  readonly isDeleted: boolean;
  readonly country: string;
  readonly currency: Currency;
  readonly type: string;
  readonly id: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type PaystackSupportedCountry = {
  readonly id: number;
  readonly activeForDashboardOnboarding: boolean;
  readonly name: string;
  readonly isoCode: string;
  readonly defaultCurrencyCode: Currency;
  readonly integrationDefaults: Record<string, never>;
  readonly callingCode: string;
  readonly pilotMode: boolean;
  readonly relationships: {
    [SupportedCountryRelationshipType.CURRENCY]:
      SupportedCountryCurrencyRelationship;
    [SupportedCountryRelationshipType.INTEGRATION_FEATURE]:
      SupportedCountryRelationship<
        SupportedCountryRelationshipType.INTEGRATION_FEATURE,
        any
      >;
    [SupportedCountryRelationshipType.INTEGRATION_TYPE]:
      SupportedCountryRelationship<
        SupportedCountryRelationshipType.INTEGRATION_TYPE,
        PaystackIntegrationType
      >;
    [SupportedCountryRelationshipType.PAYMENT_METHOD]:
      SupportedCountryRelationship<
        SupportedCountryRelationshipType.PAYMENT_METHOD,
        PaystackPaymentMethod
      >;
  };
  readonly canGoLiveAutomatically: boolean;
};

export type SupportedCountryRelationship<
  T extends SupportedCountryRelationshipType,
  D,
> = {
  readonly type: T;
  readonly data: D[];
};

export type SupportedCountryCurrencyRelationship =
  & SupportedCountryRelationship<
    SupportedCountryRelationshipType.CURRENCY,
    Array<string>
  >
  & {
    readonly supportedCurrencies: Record<Currency, SupportedCountryCurrency>;
  };

export type SupportedCountryCurrency = {
  readonly bank: SupportedCountryBank;
  readonly mobileMoney?: {
    readonly bankType: "mobile_money";
    readonly phoneNumberLabel: string;
    readonly placeholder: string;
    readonly accountNumberPattern: AccountNumberPattern;
  };
  readonly mobileMoneyBusiness?: {
    readonly bankType: "mobile_money_business";
    readonly accountVerificationRequired: boolean;
    readonly phoneNumberLabel: string;
    readonly accountNumberPattern: AccountNumberPattern;
  };
  readonly eft?: {
    readonly accountNumberPattern: AccountNumberPattern;
    readonly placeholder: string;
  };
};

export type SupportedCountryBank = {
  readonly bankType: string;
  readonly requiredFields?: string[];
  readonly branchCode: boolean;
  readonly branchCodeType: string;
  readonly accountName: boolean;
  readonly accountVerificationRequired: boolean;
  readonly accountNumberLabel: string;
  readonly accountNumberPattern: AccountNumberPattern;
  readonly documents: string[];
  readonly notices?: string[];
  readonly showAccountNumberTooltip?: boolean;
};

export type AccountNumberPattern = {
  readonly exactMatch: boolean;
  readonly pattern: string;
};
