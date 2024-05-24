import React from 'react'

const Comment = ({comment,setComment,warning,success,onSubmit}) => {
  return (
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
            <button onClick={() => onSubmit(false)}>submit</button>
            {success && (
              <p className="text-success">Review submitted successfully. </p>
            )}
          </div>
  )
}

export default Comment