import React from "react";
import PropTypes from "prop-types";
import { FaStar, FaRegStar } from "react-icons/fa";

export function HeartRating({ rating, onRatingChange }) {
  const handleRatingChange = (value) => {
    onRatingChange(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} style={{ color: value <= rating ? "#ffc107" : "#e4e5e9", cursor: "pointer" }} onClick={() => handleRatingChange(value)}>
          {value <= rating ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
}

HeartRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};
