"use client";

import { useState } from "react";
import ChooseRole from "./allPages/ChooseRole";
import EmailPassword from "./allPages/EmailPassword";

export default function Register() {
  const [data, setData] = useState<object>();

  let [page, setPage] = useState("ChooseRole");

  const Page = (page: string) => {
    switch (page) {
      case "ChooseRole":
        return <ChooseRole setData={setData} setPage={setPage} />;
      //   case "EmailPassword":
      //     return (
      //       <EmailPassword setData={setData} setPage={setPage} data={data} />
      //     );
      case "HostDetails":
        return;
      case "ParticipantDetails":
        return;
      case "HostInterest":
        return;
    }
  };

  return <main>{Page(page)}</main>;
}
