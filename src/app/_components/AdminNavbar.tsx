"use client";
import { usePathname } from "next/navigation";
import { NavItem } from "./navItem";
import Image from "next/image";
import {
  faFlag,
  faMoneyBillTransfer,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

export function AdminNavbar() {
  const pathName = usePathname();
  const isVerifiedRequest = pathName.startsWith("/admin/verified-request");
  const isReport = pathName.startsWith("/admin/report");
  const isWithdrawalRequest = pathName.startsWith("/admin/withdrawal-request");

  return (
    <nav className="sticky left-0 top-0 z-50 flex h-screen w-[205px] min-w-[205px] flex-col justify-between gap-8 bg-secondary-400 p-3 py-9 shadow-sm">
      <Image
        src="/svgs/logo-default.svg"
        alt="logo"
        width={80}
        height={51}
        className="self-center"
      />
      <div className="flex h-full flex-col gap-3">
        <NavItem
          icon={faUserCheck}
          link="/admin/verified-request"
          isSelected={isVerifiedRequest}
          title="Verified Request"
        />
        <NavItem
          icon={faFlag}
          link="/admin/report"
          isSelected={isReport}
          title="Report"
        />
        <NavItem
          icon={faMoneyBillTransfer}
          link="/admin/withdrawal-request"
          isSelected={isWithdrawalRequest}
          title="Withdrawal Request"
        />
      </div>
    </nav>
  );
}
