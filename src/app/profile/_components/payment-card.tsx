import { Separator } from "@/components/ui/separator";
import {
  faHistory,
  faMinus,
  faMoneyCheckDollar,
  faPlus,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PaymentCardProps = {
  balance: number;
};

export default function PaymentCard(props: PaymentCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border-[1px] border-primary-500 bg-white p-6 text-high md:h-[256px]">
      <div className="flex gap-2">
        <FontAwesomeIcon
          className="h-6 w-6 text-primary-500"
          icon={faMoneyCheckDollar}
        />
        <h4 className="h4 font-bold">Payment</h4>
      </div>
      <div className="flex h-full flex-col gap-4 rounded-lg bg-bgColor p-4">
        <p className="flex flex-col gap-2">
          <span className="text-sm text-medium">My Wallet</span>
          <span className="h2 font-bold">฿{props.balance}</span>
        </p>
        <Separator className="border-t-[1px] border-disable" />
        <div className="grid grow grid-cols-1 grid-rows-3 place-items-center justify-around md:grid-cols-3 md:grid-rows-1">
          <button className="flex w-full grow items-center justify-center gap-2 rounded-md px-4 py-4 hover:bg-primary-50 md:py-2">
            <div className="relative h-6 w-8">
              <FontAwesomeIcon
                className="h-6 w-6 text-primary-500"
                icon={faWallet}
              />
              <FontAwesomeIcon
                className="absolute right-0 top-0 h-[12px] w-[12px] rounded-full bg-primary-300 p-[2px] text-white"
                fontWeight={900}
                icon={faPlus}
              />
            </div>
            Top Up
          </button>

          <button className="flex w-full grow items-center justify-center gap-2 rounded-md px-4 py-4 hover:bg-primary-50 md:py-2">
            <div className="relative h-6 w-8">
              <FontAwesomeIcon
                className="h-6 w-6 text-primary-500"
                icon={faWallet}
              />
              <FontAwesomeIcon
                className="absolute right-0 top-0 h-[12px] w-[12px] rounded-full bg-primary-300 p-[2px] text-white"
                fontWeight={900}
                icon={faMinus}
              />
            </div>
            With Draw
          </button>

          <button className="flex w-full grow items-center justify-center gap-2 rounded-md px-4 py-4 hover:bg-primary-50 md:py-2">
            <FontAwesomeIcon
              className="h-6 w-6 text-primary-500"
              icon={faHistory}
            />
            Transaction History
          </button>
        </div>
      </div>
    </div>
  );
}
