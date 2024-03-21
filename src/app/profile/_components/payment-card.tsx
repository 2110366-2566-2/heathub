import { Separator } from "@/components/ui/separator";
import {
  faHistory,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TopUpDialog } from "./topup-modal";
import { WitndrawDialog } from "./withdraw-modal";

type PaymentCardProps = {
  balance: number;
  role: "host" | "participant";
};

export default function PaymentCard(props: PaymentCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border-[1px] border-none bg-neutral-50 p-6 text-high md:h-[256px]">
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
          <span className="h2 font-bold">฿{props.balance}</span>
        </p>
        <Separator className="border-t-[1px] border-disable" />
        <div className="grid grow grid-cols-1 grid-rows-2 place-items-center justify-around md:grid-cols-2 md:grid-rows-1">
          {props.role === "host" ? <WitndrawDialog /> : <TopUpDialog />}

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
