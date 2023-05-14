import React from "react";
import PropTypes from "prop-types";

export function HeartRating({ rating, onRatingChange }) {
  const handleRatingChange = (value) => {
    onRatingChange(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} style={{ color: value <= rating ? "#ad2323" : "gray", cursor: "pointer" }} onClick={() => handleRatingChange(value)}>
          ❤
        </span>
      ))}
    </div>
  );
}

HeartRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

