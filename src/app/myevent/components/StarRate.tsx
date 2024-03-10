import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function StarRateOnclick() {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        return (
          <div key={index} onClick={() => setRating(currentRate)}>
            <FontAwesomeIcon
              icon={faStar}
              className={`h-8 w-8 px-1 ${currentRate <= rating ? "text-pending" : "text-neutral-200"}`}
            />
          </div>
        );
      })}
      <span className="ml-auto">{rating}/5 stars</span>
    </div>
  );
}

interface StarRating {
  Rating: number;
}

export function StarRate(props: StarRating) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        return (
          <div key={index}>
            <FontAwesomeIcon
              icon={faStar}
              className={`h-8 w-8 px-1 ${index <= props.Rating - 1 ? "text-pending" : "text-neutral-200"}`}
            />
          </div>
        );
      })}
      <span className="ml-auto">{props.Rating}/5 stars</span>
    </div>
  );
}
