"use client";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GobackArrowProps {
  setPage: (page: string) => void;
  Page: string;
}

export default function GoBackArrow(props: GobackArrowProps) {
  const goBack = (props: GobackArrowProps) => {
    switch (props.Page) {
      case "HostInterest":
        props.setPage("HostDetails");
        return;
      case "HostDetails":
        props.setPage("EmailPassword");
        return;
      case "ParticipantDetails":
        props.setPage("EmailPassword");
        return;
      case "EmailPassword":
        props.setPage("ChooseRole");
        return;
    }
  };

  return (
    <FontAwesomeIcon
      className="h-6 hover:cursor-pointer"
      onClick={() => {
        goBack(props);
      }}
      icon={faAngleLeft}
    ></FontAwesomeIcon>
  );
}
