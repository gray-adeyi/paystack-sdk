export enum Status {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export enum Identification {
  BVN = "bvn",
  BANK_ACCOUNT = "bank_account",
}

export enum Country {
  NIGERIA = "NG",
  GHANA = "GH",
  SOUTH_AFRICA = "ZA",
  KENYA = "KE",
  COTE_D_IVOIRE = "CI",
  EGYPT = "EG",
}

export enum AccountType {
  PERSONAL = "personal",
  BUSINESS = "business",
}

export enum Document {
  IDENTITY_NUMBER = "identityNumber",
  PASSPORT_NUMBER = "passportNumber",
  BUSINESS_REGISTRATION_NUMBER = "businessRegistrationNumber",
}

export enum Reason {
  RESEND_OTP = "resend_otp",
  TRANSFER = "transfer",
  DISABLE_OTP = "disable_otp",
}

export enum Currency {
  NGN = "NGN",
  GHS = "GHS",
  ZAR = "ZAR",
  USD = "USD",
  KES = "KES",
  XOF = "XOF",
  EGP = "EGP",
}
