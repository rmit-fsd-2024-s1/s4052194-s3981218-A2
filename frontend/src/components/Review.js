// Review.js
import React from "react";
import { useRef, useState, useEffect } from "react";
import useReview from "../fragments/customHook/useReview";
import ReactPaginate from "react-paginate";
import useCart from "../fragments/context/CartContext";
import Comment from "./Comment";
import Star from "./Star";
import useFollower from "../fragments/customHook/useFollower";
import CommentStar from "./CommentStar";
import useRatingState from "../fragments/customHook/useRatingState";
import useCommentState from "../fragments/customHook/useCommentState";
import useReplyState from "../fragments/customHook/useReplyState";
import { useScrollToTop } from "../fragments/customHook/useScrollToTop";
import useEditState from "../fragments/customHook/useEditState";
import useWarningState from "../fragments/customHook/useWarningState";
const Review = ({ productId, block }) => {
  useScrollToTop();
  const {
    state,
    getReviewByProductId,
    loadingReview,
    createReview,
    createReply,
    removeReview,
    updateReview,
  } = useReview();
  const { userId } = useCart();
  const { state: followerState, following, unfollowing } = useFollower();
  const handleClick = () => {
    setShowInput(true);
  };
  //ref https://tutorial101.blogspot.com/2021/10/reactjs-star-rating.html
  //star rating
  const { rating, setRating, hoverRating, setHoverRating, stars } =
    useRatingState();
  //comment
  const { comment, setComment, showInput, setShowInput } = useCommentState();
  //reply
  const [success, setSuccess] = useState(false);
  const {
    reply,
    showReply,
    reviewReply,
    setReviewReply,
    replyText,
    setReplyText,
  } = useReplyState();
  //edit

  const {
    showEdit,
    setShowEdit,
    edit,
    setEdit,
    editReviewId,
    setEditReviewId,
  } = useEditState();

  //warning
  const {
    warning,
    setWarning,
    replyWarning,
    setReplyWarning,
    editWarning,
    setEditWarning,
  } = useWarningState();

  //reviews
  const [productReviews, setProductReviews] = useState();
  useEffect(() => {
    setProductReviews(getReviewByProductId(productId));
  }, [state, productId, success]);
  //submit button
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
      apiSubmitReview('reply',review);
    } else {
      setWarning(false);
      review.score = rating;
      review.comment = comment;
      apiSubmitReview('review',review);
    }
  };

  //creating a review
  const apiSubmitReview = (status,review) => {
    try {
      if (status === 'review') {
        createReview(review);
      } else if (status === 'reply') {
        createReply(review);
      }
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
  const followedList = followerState.followers.map((e) => {
    return e.user_follower === userId && e.user_followed;
  });
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
  //delete a review
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      removeReview(id);
    }
  };
//follow part
  const handleFollow = (action, reviewUserId) => {
    if (action === "unfollow") {
      window.confirm("You sure you want to unfollow?") &&
        unfollowing(userId, reviewUserId);
    } else {
      window.confirm(`You sure you want to follow this user?`) &&
        following(userId, reviewUserId);
    }
  };
  //loading reviews
  if (loadingReview) {
    return <div>Loading...</div>;
  }
//edit the review
  const handleEdit = (e) => {
    setEdit(e.target.value);
  };

  const isDeleted = (comment) => {
    return comment === "**** This review has been deleted by the admin ****";
  };

  return (
    <>
      <div className="mt-5">
        <div className="h4 mt-5 d-inline">Reviews</div>
        {userId && !block ? (
          <button className="d-inline mx-5" onClick={handleClick}>
            Write a review
          </button>
        ) : (userId &&
          <p> Bad behavior. You are blocked. You can't write a review. </p>
        )}
      </div>
      {showInput && (
        <>
          <div className="d-flex mt-3">
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
              <div className="card p-3">
                <div className="card-header bg-white">
                  <CommentStar rating={review.score} key={review.review_id} />
                </div>
                <div className="card-body">
                  <div className="d-flex my-2 justify-content-between">
                    <h5 className="card-title fw-bold"> {review.user.username}</h5>
                    {/* follow user part */}
                    {userId &&
                      userId !== review.user_id &&
                      (followedList.includes(review.user_id) ? (
                        <p
                          className="text-white unfollow p-2 fw-bold border border-1 bg-dark"
                          onClick={() =>
                            handleFollow("unfollow", review.user_id)
                          }
                        >
                          followed
                        </p>
                      ) : (
                        <p
                          className="text-dark follow p-2 fw-bold border border-1 bg-white"
                          onClick={() => handleFollow(null, review.user_id)}
                        >
                          follow
                        </p>
                      ))}
                  </div>
                  <p className="card-text d-inline"> {review.comment}</p>
                  {userId && !block && !isDeleted(review.comment) && (
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

                  {userId &&
                  review.user_id === userId &&
                  !isDeleted(review.comment) ? (
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
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {/* reply to review part */}
                </div>
                {/* edit or delete part */}
                {productReviews.map((r) => {
                  if (r.parent_id === review.review_id) {
                    if (r.user && r.user.username !== undefined) {
                      return (
                        <div className="ms-5">
                          <div className="card-header bg-white"></div>
                          <div className="card-body">
                            <h5 className="card-title fw-bold">
                              {" "}
                              {r.user.username}
                            </h5>
                            <p className="card-text"> {r.comment}</p>
                            {userId &&
                            r.user_id === userId &&
                            !isDeleted(r.comment) ? (
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
                                      <button
                                        onClick={() => setShowEdit(false)}
                                      >
                                        Close
                                      </button>
                                      {edit ? edit.trim().split(" ").length : 0}{" "}
                                      word(s)
                                      {editWarning ? (
                                        <p className="text-danger">
                                          Exceeded words limit. Maximum 100
                                          words.{" "}
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
