import { useState } from "react";

const useReplyState = () => {
  const [reply, showReply] = useState(false);
  const [reviewReply, setReviewReply] = useState();
  const [replyText, setReplyText] = useState();

  return {
    reply,
    showReply,
    reviewReply,
    setReviewReply,
    replyText,
    setReplyText,
  };
};

export default useReplyState;
