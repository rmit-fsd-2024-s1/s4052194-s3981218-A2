import { useState } from "react";

const useWarningState = () => {
  const [warning, setWarning] = useState(false);
  const [replyWarning, setReplyWarning] = useState(false);
  const [editWarning, setEditWarning] = useState(false);

  return { warning, setWarning, replyWarning, setReplyWarning, editWarning, setEditWarning };
};

export default useWarningState;
