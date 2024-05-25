export const followerReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "InitFollowers":
      return {
        ...state,
        followers: payload.followers,
      };
    case "follow":
      return {
        ...state,
        followers: [...state.followers, payload.followers],
      };
    case "unFollow":
      //filter out
      return {
        ...state,
        followers: payload.newFollowers,
      };
    default:
      return state;
  }
};
