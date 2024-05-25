import { useState } from "react";

const useRatingState = () => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return { rating, setRating, hoverRating, setHoverRating, stars };
};

export default useRatingState;
