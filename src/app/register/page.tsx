"use client";

import { type User } from "./interfaces";
import { useState } from "react";
import ChooseRole from "./allPages/ChooseRole";
import EmailPassword from "./allPages/EmailPassword";
import HostDetails from "./allPages/HostDetails";
import ParticipantDetails from "./allPages/ParticipantDetails";

export default function Register() {
  const [data, setData] = useState<User>({});

  let [page, setPage] = useState("ChooseRole");

  console.log(data);
  console.log(`Page: ${page}`);

  const Page = (page: string) => {
    switch (page) {
      case "ChooseRole":
        return <ChooseRole setData={setData} setPage={setPage} />;
      case "EmailPassword":
        return (
          <EmailPassword
            setData={setData}
            setPage={setPage}
            data={data}
            page={page}
          />
        );
      case "HostDetails":
        return (
          <HostDetails
            setData={setData}
            setPage={setPage}
            data={data}
            page={page}
          />
        );
      case "ParticipantDetails":
        return (
          <ParticipantDetails
            setData={setData}
            setPage={setPage}
            data={data}
            page={page}
          />
        );
      case "HostInterest":
        return;
    }
  };

  return <main>{Page(page)}</main>;
}
