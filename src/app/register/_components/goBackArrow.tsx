"use client";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GoBackArrow() {
  const goBack = () => {
    window.history.back();
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
