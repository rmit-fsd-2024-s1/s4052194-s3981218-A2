import React from "react";
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
        className={styleClass}
        focusable="false"
        viewBox="0 0 25 24"
        width="40px"
        height="33px"
        aria-label=""
        tabIndex="0"
        aria-hidden="true"
        class="ugc-rr-pip-fe-svg-icon ugc-rr-pip-fe-rating-star-bar__star ugc-rr-pip-fe-rating-star-bar__star--filled"
      >
        <path d="m11.9999 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8626 18l-3.8627-1.7182L8.1372 18l.4252-4.2391-2.8125-3.1773 4.1255-.9018L11.9999 6z"></path>
      </svg>
    </div>
  );
};
export default Star;
