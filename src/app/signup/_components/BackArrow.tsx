"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { type Dispatch, type SetStateAction } from "react";

interface GobackArrowProps {
  setPage: Dispatch<
    SetStateAction<
      | "ChooseRole"
      | "EmailPassword"
      | "HostDetails"
      | "ParticipantDetails"
      | "HostInterest"
    >
  >;
  Page: string;
}

export default function GoBackArrow(props: GobackArrowProps) {
  const { setPage, Page } = props;

  const goBack = () => {
    switch (Page) {
      case "HostInterest":
        setPage("HostDetails");
        return;
      case "HostDetails":
        setPage("EmailPassword");
        return;
      case "ParticipantDetails":
        setPage("EmailPassword");
        return;
      case "EmailPassword":
        setPage("ChooseRole");
        return;
    }
  };

  return (
    <FontAwesomeIcon
      className="h-6 text-primary-900 hover:cursor-pointer hover:text-black"
      onClick={() => {
        goBack();
      }}
      icon={faAngleLeft}
    ></FontAwesomeIcon>
  );
}
