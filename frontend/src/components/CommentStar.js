import React from "react";

const CommentStar = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg
        focusable="false"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-label=""
        tabIndex="0"
        aria-hidden="true"
        className="ugc-rr-pip-fe-svg-icon ugc-rr-pip-fe-rating-star-bar__star ugc-rr-pip-fe-rating-star-bar__star--filled"
        key={i}
      >
        <path d="m11.9999 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8626 18l-3.8627-1.7182L8.1372 18l.4252-4.2391-2.8125-3.1773 4.1255-.9018L11.9999 6z"></path>
      </svg>
    );
  }
  return <>{stars}</>;
};
export default CommentStar;
