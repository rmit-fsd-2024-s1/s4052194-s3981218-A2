import { useState } from "react";

const useCommentState = () => {
  const [comment, setComment] = useState("");
  const [showInput, setShowInput] = useState(false);

  return { comment, setComment, showInput, setShowInput };
};

export default useCommentState;
