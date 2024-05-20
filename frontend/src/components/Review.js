import React from "react";
import { useRef, useState } from "react";
const Review = ({ productId }) => {
  const login = true;
  const [showInput, setShowInput] = useState(false);
  const handleClick = () => {
    setShowInput(true);
  };
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      {console.log(rating)}
      <div className="mt-5">
        <div className="h4 mt-5 d-inline">Reviews</div>
        {login && (
          <button className="d-inline mx-5" onClick={handleClick}>
            Write a review
          </button>
        )}
      </div>
      {showInput && (
        <>
          <div class="d-flex mt-3">
            {stars.map((star, i) => (
              <Star
                key={i}
                starId={i + 1}
                rating={hoverRating || rating}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <div className="mb-3">
            <label for="comment" className="form-label"></label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              maxlength="100"
            ></textarea>
            <button>submit</button>
          </div>
        </>
      )}
      {/* //show all reviews */}
    </>
  );
};
//ref https://tutorial101.blogspot.com/2021/10/reactjs-star-rating.html
const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
  let styleClass = "star-rating-blank";
  if (rating >= starId) {
    styleClass = "star-rating-filled";
  }
  return (
    <div
      className="star"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <svg
        height="25px"
        width="33px"
        class={styleClass}
        viewBox="0 0 25 23"
        data-rating="1"
      >
        <polygon
          stroke-width="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </div>
  );
};
export default Review;
