import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { type StarProps } from "../types";

export default function StarRateOnclick(props : StarProps) {
  
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const currentRate = index + 1;
        return (
          <div key={index} onClick={() => props.setRating(currentRate)}>
            <FontAwesomeIcon
              icon={faStar}
              className={`h-8 w-8 px-1 ${
                currentRate <= props.rating ? "text-pending" : "text-neutral-200"
              }`}
            />
          </div>
        );
      })}
      <span className="ml-auto">{props.rating}/5 stars</span>
    </div>
  );
}

interface StarRating {
  Rating: number;
}

export function StarRate(props: StarRating) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <div key={index}>
            <FontAwesomeIcon
              icon={faStar}
              className={`h-8 w-8 px-1 ${
                index <= props.Rating - 1 ? "text-pending" : "text-neutral-200"
              }`}
            />
          </div>
        );
      })}
      <span className="ml-auto">{props.Rating}/5 stars</span>
    </div>
  );
}
