"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface GobackArrowProps {
  setPage: (page: string) => void;
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
      className="h-6 hover:cursor-pointer"
      onClick={() => {
        goBack();
      }}
      icon={faAngleLeft}
    ></FontAwesomeIcon>
  );
}
