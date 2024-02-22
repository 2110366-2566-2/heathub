export interface ChatEventInfoInterface {
  location: string;
  price: number;
  startTime: Date;
  endTime: Date;
  status: "success";
}
export default function ChatEventInfo(info: ChatEventInfoInterface) {
  return (
    <div className="flex h-fit w-full max-w-[460px] flex-col bg-blue-500  p-2">
      <div className="flex flex-row justify-between">
        <div className="h3 flex-1 font-bold">Event Detail</div>
        <div className="bg-green-700">{info.status}</div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="h4 flex-1">Location</div>
        <div className="bg-green-700">{info.location}</div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="h4 flex-1">Price</div>
        <div className="bg-green-700">{info.price}</div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="h4 flex-1">Date</div>
        <div className="bg-green-700"></div>
      </div>
      <div></div>
    </div>
  );
}
