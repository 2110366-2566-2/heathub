import { Separator } from "@/components/ui/separator";
import { serverapi } from "@/trpc/server";
import {
  faHistory,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TopUpDialog } from "./topup-modal";
import { WithdrawDialog } from "./withdraw-modal";

export default async function PaymentCard() {
  const user = await serverapi.auth.me.query();
  let bankData: Awaited<
    ReturnType<typeof serverapi.profile.getMyBankInfo.query>
  > | null = null;
  if (user?.role === "host") {
    bankData = await serverapi.profile.getMyBankInfo.query();
  }

  // const { data: bankData } = api.profile.getMyBankInfo.useQuery();
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border-[1px] border-none bg-neutral-50 p-6 text-high">
      <div className="flex gap-2">
        <FontAwesomeIcon
          className="h-6 w-6 text-secondary-500"
          icon={faMoneyCheckDollar}
        />
        <h4 className="h4 font-bold">Payment</h4>
      </div>
      <div className="flex h-full flex-col gap-4 rounded-lg bg-invert p-4">
        <p className="flex flex-col gap-2">
          <span className="text-sm text-medium">My Wallet</span>
          <span className="h2 font-bold">฿{(user?.balance ?? 0) / 100}</span>
          {bankData && (
            <span className="text-sm text-medium">
              Withdrawable{" "}
              {((user?.balance ?? 0) - (bankData?.pendingWithdrawal ?? 0)) /
                100}
              ฿
            </span>
          )}
        </p>
        <Separator className="border-t-[1px] border-disable" />
        <div className="grid grow grid-cols-1 grid-rows-2 place-items-center justify-around md:grid-cols-2 md:grid-rows-1">
          {user?.role === "host" ? (
            <WithdrawDialog
              withdrawalAmount={
                (user?.balance ?? 0) - (bankData?.pendingWithdrawal ?? 0)
              }
              bankName={bankData?.defaultPayoutBankName ?? null}
              bankAccount={bankData?.defaultPayoutBankAccount ?? null}
            />
          ) : (
            <TopUpDialog />
          )}

          <button className="h5 flex w-full grow items-center justify-center gap-2 rounded-md px-1 py-4 hover:bg-secondary-50 md:py-2">
            <FontAwesomeIcon
              className="h-6 w-6 text-secondary-500"
              icon={faHistory}
            />
            Transaction History
          </button>
        </div>
      </div>
    </div>
  );
}
