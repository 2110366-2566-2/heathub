export const BANK_LIST = [
  "KBank",
  "KKP",
  "SCB",
  "BBL",
  "Krungsri",
  "UOB",
  "TTB",
  "GSB",
  "KTB",
] as const;

export const BANK_NAME_MAPPER = {
  BBL: "Bangkok Bank",
  GSB: "Government Savings Bank",
  KBank: "Kasikorn Bank",
  KKP: "Kiatnakin Phatra Bank",
  Krungsri: "Krungsri",
  KTB: "Krungthai Bank",
  SCB: "SCB Bank",
  TTB: "TMB Bank",
  UOB: "UOB Bank",
} as const;

export type Bank = (typeof BANK_LIST)[number];
