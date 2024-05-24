import React from "react";
import { useRef, useState, useEffect } from "react";
import useReview from "../fragments/customHook/useReview";
import ReactPaginate from "react-paginate";
import useCart from "../fragments/context/CartContext";
import Comment from "./Comment";
import Star from "./Star";
import CommentStar from "./CommentStar";
const Review = ({ productId }) => {
  const {
    state,
    getReviewByProductId,
    loadingReview,
    createReview,
    removeReview,
    updateReview,
  } = useReview();
  const { userId } = useCart();
  const [page, setPage] = useState(0);
  const handleClick = () => {
    setShowInput(true);
  };

  //ref https://tutorial101.blogspot.com/2021/10/reactjs-star-rating.html
  //star rating
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  //comment
  const [comment, setComment] = useState();
  const [showInput, setShowInput] = useState(false);
  //reply
  const [reply, showReply] = useState(false);
  const [reviewReply, setReviewReply] = useState();
  const [replyText, setReplyText] = useState();
  const [success, setSuccess] = useState(false);
  //edit
  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState();
  const [editReviewId, setEditReviewId] = useState();
  //warning
  const [warning, setWarning] = useState(false);
  const [replyWarning, setReplyWarning] = useState(false);
  const [editWarning, setEditWarning] = useState(false);
  //reviews
  const [productReviews, setProductReviews] = useState();
  useEffect(() => {
    setProductReviews(getReviewByProductId(productId));
  }, [state, productId, success]);

  const onSubmit = (isReply, parentId) => {
    if ((!isReply && !comment) || (isReply && !replyText)) {
      alert("Please type something!");
      return;
    }
    if (replyText && replyText.trim().split(" ").length > 100) {
      setReplyWarning(true);
      return;
    }
    if (comment && comment.trim().split(" ").length > 100) {
      setWarning(true);
      return;
    }
    let review = { user_id: userId, product_id: productId };
    if (isReply) {
      setReplyWarning(false);
      review.score = null;
      review.comment = replyText;
      review.parent_id = parentId;
    } else {
      setWarning(false);
      review.score = rating;
      review.comment = comment;
    }
    apiSubmitReview(review);
  };

  //creating a review
  const apiSubmitReview = (review) => {
    try {
      createReview(review);
      setComment("");
      setReplyText("");
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
    } finally {
      showReply(false);
      setShowInput(false);
    }
  };
  //for editing a review
  const handleEditSubmit = (id, comment) => {
    if (!comment) {
      alert("Please type something!");
      return;
    }
    if (comment && comment.trim().split(" ").length > 100) {
      setEditWarning(true);
      return;
    }
    try {
      updateReview(id, comment);
      setEdit("");
      setShowEdit(false);
      setEditWarning(false);
    } catch (err) {
      console.log(err);
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

  const handleEdit = (e) => {
    setEdit(e.target.value);
  };
  return (
    <>
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
          <Comment
            comment={comment}
            setComment={setComment}
            warning={warning}
            success={success}
            onSubmit={onSubmit}
          />
        </>
      )}
      <hr className="mt-3" />
      {/* //show all reviews */}
      {productReviews.map((review) => {
        return (
          <div key={review.review_id}>
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
                          setShowEdit(false);
                          setShowInput(false);
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
                      {replyWarning && (
                        <p className="text-danger">
                          Exceeded words limit. Maximum 100 words.{" "}
                        </p>
                      )}
                      {replyText ? replyText.trim().split(" ").length : 0}{" "}
                      word(s)
                      <button onClick={() => onSubmit(true, review.review_id)}>
                        submit
                      </button>
                    </div>
                  )}
                  {userId && review.user_id === userId ? (
                    <div className="d-inline float-end">
                      {" "}
                      <span
                        className="mx-5 review-menu"
                        onClick={() => {
                          setShowEdit(true);
                          setShowInput(false);
                          showReply(false);
                          setEdit(review.comment);
                          setEditReviewId(review.review_id);
                        }}
                      >
                        edit
                      </span>
                      <span
                        className="review-menu"
                        onClick={() => onDelete(review.review_id)}
                      >
                        delete
                      </span>
                      {showEdit && editReviewId === review.review_id && (
                        <>
                          <textarea
                            className="form-control"
                            id="edit"
                            rows="3"
                            value={edit}
                            onChange={handleEdit}
                          ></textarea>
                          <div className="mt-3">
                          <button
                            onClick={() =>
                              handleEditSubmit(review.review_id, edit)
                            }
                            className="mx-4"
                          >
                            Submit
                          </button>
                          <button onClick={() => setShowEdit(false)}>
                            Close
                          </button>
                          {edit ? edit.trim().split(" ").length : 0} word(s)
                          {editWarning ? (
                            <p className="text-danger">
                              Exceeded words limit. Maximum 100 words.{" "}
                            </p>
                          ) : (
                            ""
                          )}</div>
                        </>
                      )}
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
                                <span
                                  className="mx-5 review-menu"
                                  onClick={() => {
                                    setShowEdit(true);
                                    setShowInput(false);
                                    showReply(false);

                                    setEdit(r.comment);
                                    setEditReviewId(r.review_id);
                                  }}
                                >
                                  edit
                                </span>
                                <span
                                  className="review-menu"
                                  onClick={() => onDelete(r.review_id)}
                                >
                                  delete
                                </span>
                                {showEdit && editReviewId === r.review_id && (
                                  <>
                                    <textarea
                                      className="form-control"
                                      id="edit"
                                      rows="3"
                                      cols="50"
                                      value={edit}
                                      onChange={handleEdit}
                                    ></textarea>
                                    <div className="mt-2">
                                    <button
                                      onClick={() =>
                                        handleEditSubmit(r.review_id, edit)
                                      }
                                      className="mx-4"
                                    >
                                      Submit
                                    </button>
                                    <button onClick={() => setShowEdit(false)}>
                                      Close
                                    </button>
                                    
                                    {edit ? edit.trim().split(" ").length : 0}{" "}
                                    word(s)
                                    {editWarning ? (
                                      <p className="text-danger">
                                        Exceeded words limit. Maximum 100 words.{" "}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    </div>
                                  </>
                                )}
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
    </>
  );
};
//ref https://tutorial101.blogspot.com/2021/10/reactjs-star-rating.html

export default Review;
