import { useState } from "react";

const useEditState = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [edit, setEdit] = useState();
    const [editReviewId, setEditReviewId] = useState();

  return { showEdit, setShowEdit, edit, setEdit, editReviewId, setEditReviewId };
};

export default useEditState;
