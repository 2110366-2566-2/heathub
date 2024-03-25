import { type Bank } from "@/constants/payment";

import { type ReactNode } from "react";
import KrungsriIcon from "./banks/bay";
import BangkokBankIcon from "./banks/bbl";
import GSBIcon from "./banks/gsb";
import KBankIcon from "./banks/kbank";
import KKPIcon from "./banks/kk";
import KTBIcon from "./banks/ktb";
import SCBIcon from "./banks/scb";
import TTBIcon from "./banks/ttb";
import UOBIcon from "./banks/uob";

type BankInfo = {
  icon: (props: {
    className?: string;
    style?: React.CSSProperties;
    fill?: string;
  }) => ReactNode;
  fg: string;
  bg: string;
};

const svgMapper: Record<Bank, BankInfo> = {
  KBank: {
    icon: KBankIcon,
    fg: "#ffffff",
    bg: "#0f8b31",
  },
  Krungsri: {
    icon: KrungsriIcon,
    fg: "#f5cf02",
    bg: "#6d5c5c",
  },
  TTB: {
    icon: TTBIcon,
    fg: "#ef861e",
    bg: "#012c5f",
  },
  UOB: {
    icon: UOBIcon,
    fg: "#ffffff",
    bg: "#ee323d",
  },
  SCB: {
    icon: SCBIcon,
    fg: "#f4a919",
    bg: "#4a2879",
  },
  BBL: {
    icon: BangkokBankIcon,
    fg: "#ffffff",
    bg: "#0f0f7e",
  },
  GSB: {
    icon: GSBIcon,
    fg: "#ffffff",
    bg: "#e50589",
  },
  KTB: {
    icon: KTBIcon,
    fg: "#ffffff",
    bg: "#05a1db",
  },
  KKP: {
    icon: KKPIcon,
    fg: "#ffffff",
    bg: "#594e70",
  },
};

export function BankIcon(props: { bank: Bank }) {
  const { bank } = props;
  const bankData = svgMapper[bank];
  return (
    <>
      <bankData.icon
        style={{
          fill: bankData.fg,
          color: bankData.fg,
          background: bankData.bg,
        }}
        fill={bankData.fg}
        className="h-6 w-6 rounded-full p-1"
      />
    </>
  );
}
