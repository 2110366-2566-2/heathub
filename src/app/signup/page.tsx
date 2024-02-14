"use client";

import { useState } from "react";
import ChooseRole from "./_components/_pages/ChooseRole";
import EmailPassword from "./_components/_pages/EmailPassword";
import HostDetails from "./_components/_pages/HostDetails";
import HostInterest from "./_components/_pages/HostInterest";
import ParticipantDetails from "./_components/_pages/ParticipantDetails";
import { createHost, type User } from "./interfaces";

export default function Register() {
  const [data, setData] = useState<User>(createHost());

  let [page, setPage] = useState<
    | "ChooseRole"
    | "EmailPassword"
    | "HostDetails"
    | "ParticipantDetails"
    | "HostInterest"
  >("ChooseRole");

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
        return <HostInterest setPage={setPage} data={data} page={page} />;
    }
  };

  return <main>{Page(page)}</main>;
}
