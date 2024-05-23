import React from "react";
import { useRef, useState, useEffect } from "react";
import useReview from "../fragments/customHook/useReview";
import ReactPaginate from "react-paginate";
import useCart from "../fragments/context/CartContext";
const Review = ({ productId }) => {
  const {
    state,
    getReviewByProductId,
    loadingReview,
    createReview,
    removeReview,
  } = useReview();
  const { userId } = useCart();
  const [page, setPage] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const handleClick = () => {
    setShowInput(true);
  };
  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  //ref https://tutorial101.blogspot.com/2021/10/reactjs-star-rating.html
  //star rating
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  const [comment, setComment] = useState();
  const [warning, setWarning] = useState(false);
  const [reply, showReply] = useState(false);
  const [reviewReply, setReviewReply] = useState();
  const [replyText, setReplyText] = useState();
  const [success, setSuccess] = useState(false);
  const [productReviews, setProductReviews] = useState();
  useEffect(() => {
    setProductReviews(getReviewByProductId(productId));
  }, [state, productId, success]);
  const onSubmit = (parentId) => {
    if (
      comment &&
      (comment.trim().split(" ").length > 100 ||
        comment.trim().split(" ").length === 0)
    ) {
      setWarning(true);
    } else {
      setWarning(false);
      let review = { user_id: userId, product_id: productId };
      if (parentId) {
        review.score = null;
        review.comment = replyText;
        review.parent_id = parentId;
      } else {
        review.score = rating;
        review.comment = comment;
      }

      try {
        createReview(review);
        setComment("");
        setReplyText("");
        setSuccess(true);
      } catch (err) {
        setSuccess(false);

        console.log(err);
      }
    }
  };
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      removeReview(id);
    }
  };
  //loading reviews
  if (loadingReview) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {console.log(productReviews, "current")}
      <div className="mt-5">
        <div className="h4 mt-5 d-inline">Reviews</div>
        {userId && (
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
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></textarea>
            {warning && (
              <p className="text-danger">
                Exceeded words limit. Maximum 100 words.{" "}
              </p>
            )}
            {comment ? comment.trim().split(" ").length : 0} word(s)
            <button onClick={() => onSubmit()}>submit</button>
            {success && (
              <p className="text-success">Review submitted successfully. </p>
            )}
          </div>
        </>
      )}
      <hr className="mt-3" />
      {/* //show all reviews */}
      {productReviews.map((review) => {
        return (
          <div>
            {review.parent_id === null ? (
              <div class="card p-3">
                <div class="card-header bg-white">
                  <CommentStar rating={review.score} />
                </div>
                <div class="card-body">
                  <h5 class="card-title fw-bold"> {review.user.username}</h5>
                  <p class="card-text d-inline"> {review.comment}</p>
                  {userId && (
                    <div className="d-inline float-end">
                      {" "}
                      <span
                        className="review-menu mx-5"
                        onClick={() => {
                          showReply(true);
                          setReviewReply(review.review_id);
                        }}
                      >
                        reply
                      </span>
                    </div>
                  )}
                  {/* show reply text field */}
                  {reply && review.review_id === reviewReply && (
                    <div className="mb-3">
                      <label for="comment" className="form-label"></label>
                      <textarea
                        className="form-control"
                        id="comment"
                        rows="3"
                        value={replyText}
                        onChange={(e) => {
                          setReplyText(e.target.value);
                        }}
                      ></textarea>
                      {warning && (
                        <p className="text-danger">
                          Exceeded words limit. Maximum 100 words.{" "}
                        </p>
                      )}
                      {replyText ? replyText.trim().split(" ").length : 0}{" "}
                      word(s)
                      <button onClick={() => onSubmit(review.review_id)}>
                        submit
                      </button>
                    </div>
                  )}
                  {userId && review.user_id === userId ? (
                    <div className="d-inline float-end">
                      {" "}
                      <span className="mx-5 review-menu">edit</span>
                      <span
                        className="review-menu"
                        onClick={() => onDelete(review.review_id)}
                      >
                        delete
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* reply to review part */}
                </div>

                {productReviews.map((r) => {
                  if (r.parent_id === review.review_id) {
                    if (r.user && r.user.username !== undefined) {
                      return (
                        <div class="ms-5">
                          <div class="card-header bg-white"></div>
                          <div class="card-body">
                            <h5 class="card-title fw-bold">
                              {" "}
                              {r.user.username}
                            </h5>
                            <p class="card-text"> {r.comment}</p>
                            {userId && r.user_id === userId ? (
                              <div className="d-inline float-end">
                                {" "}
                                <span className="mx-5 review-menu">edit</span>
                                <span
                                  className="review-menu"
                                  onClick={() => onDelete(r.review_id)}
                                >
                                  delete
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    }
                  }
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
      {/* Ref week 9 lectorial COSC2758 RMIT University */}
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
        class="ugc-rr-pip-fe-svg-icon ugc-rr-pip-fe-rating-star-bar__star ugc-rr-pip-fe-rating-star-bar__star--filled"
      >
        <path d="m11.9999 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8626 18l-3.8627-1.7182L8.1372 18l.4252-4.2391-2.8125-3.1773 4.1255-.9018L11.9999 6z"></path>
      </svg>
    );
  }
  return <>{stars}</>;
};
export default Review;
