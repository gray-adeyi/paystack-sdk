/**
 * Enum of statuses supported by paystack, used by Invoice, Charge & Plan
 */
export enum Status {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

/**
 * Enum of Identification methods supported by paystack
 */
export enum Identification {
  BVN = "bvn",
  BANK_ACCOUNT = "bank_account",
}
/**
 * Enum of countries supported by paystack
 */
export enum Country {
  NIGERIA = "NG",
  GHANA = "GH",
  SOUTH_AFRICA = "ZA",
  KENYA = "KE",
  COTE_D_IVOIRE = "CI",
  EGYPT = "EG",
}

/**
 * Enum of Account types supported by paystack
 */
export enum AccountType {
  PERSONAL = "personal",
  BUSINESS = "business",
}

/**
 * Enum of Document types supported by paystack
 */
export enum Document {
  IDENTITY_NUMBER = "identityNumber",
  PASSPORT_NUMBER = "passportNumber",
  BUSINESS_REGISTRATION_NUMBER = "businessRegistrationNumber",
}

/**
 * Enum of Reset OTP options
 */
export enum Reason {
  RESEND_OTP = "resend_otp",
  TRANSFER = "transfer",
  DISABLE_OTP = "disable_otp",
}

/**
 * Enum of currencies supported by paystack.
 */
export enum Currency {
  NGN = "NGN",
  GHS = "GHS",
  ZAR = "ZAR",
  USD = "USD",
  KES = "KES",
  XOF = "XOF",
  EGP = "EGP",
}

/**
 * Enum of Transfer Recipient types
 */
export enum RecipientType {
  NUBAN = "nuban",
  MOBILE_MONEY = "mobile_money",
  BASA = "basa",
}

/**
 * Enum of payment channels supported by paystack
 */
export enum Channel {
  CARD = "card",
  BANK = "bank",
  USSD = "ussd",
  QR = "qr",
  MOBILE_MONEY = "mobile_money",
  BANK_TRANSFER = "bank_transfer",
}

/**
 * Enum for who bears paystack charges
 */
export enum Bearer {
  ACCOUNT = "account",
  SUB_ACCOUNT = "subaccount",
  ALL_PROPORTIONAL = "all-proportional",
  ALL = "all",
}

/**
 * Enum of transaction status
 */
export enum TransactionStatus {
  FAILED = "failed",
  SUCCESS = "success",
  ABANDONED = "abandoned",
}

/**
 * Enum of the types of events supported by Terminal API
 */
export enum TerminalEvent {
  TRANSACTION = "transaction",
  INVOICE = "invoice",
}

/**
 * Enum of supported terminal event actions
 */
export enum TerminalEventAction {
  PROCESS = "process",
  VIEW = "view",
  PRINT = "print",
}

/**
 * Enum of settlement schedules supported by paystack
 */
export enum Schedule {
  AUTO = "auto",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  MANUAL = "manual",
}

/**
 * Enum of split types
 */
export enum TxSplit {
  PERCENTAGE = "percentage",
  FLAT = "flat",
}

/**
 * Enum of intervals supported by paystack.
 */
export enum Interval {
  HOURLY = "hourly",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  BIANNUALLY = "biannually",
  ANNUALLY = "annually",
}

/**
 * Enum of RiskActions supported by paystack
 */
export enum RiskAction {
  DEFAULT = "default",
  WHITELIST = "allow",
  BLACKLIST = "deny",
}

/**
 * Enum of bank gateways supported by paystack
 */
export enum Gateway {
  EMANDATE = "emandate",
  DIGITALBANKMANDATE = "digitalbankmandate",
}

/**
 * Enum of bank types
 */
export enum BankType {
  GHIPPS = "ghipps",
  MOBILE_MONEY = "mobile_money",
}

/**
 * Enum of dispute status supported by paystack
 */
export enum DisputeStatus {
  PENDING = "pending",
  RESOLVED = "resolved",
  AWAITING_BANK_FEEDBACK = "awaiting-bank-feedback",
  AWAITING_MERCHANT_FEEDBACK = "awaiting-merchant-feedback",
}

/**
 * Enum of Resolutions supported by paystack
 */
export enum Resolution {
  MERCHANT_ACCEPTED = "merchant-accepted",
  DECLINED = "declined",
}
