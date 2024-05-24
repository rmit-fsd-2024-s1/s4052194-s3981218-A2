export const reviewReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "InitReviews":
            return {
              ...state,
              reviews: payload.reviews,
            };
      case "addReview":
        return {
          ...state,
          reviews: [...state.reviews, payload.reviews],
        };
      case "editReview":
        return {
          ...state,
          reviews: payload.reviews,
        };
      case "removeReview":
        //filter out
        return {
          ...state,
          reviews: payload.newReviews,
        };
      default:
        return state;
    
    }
  };
  