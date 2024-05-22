export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "InitProduct":
      return {
        ...state,
        products: payload.products,
      };
    case "AddToCart":
      return {
        ...state,
        products: [...state.products, payload.products],
      };
    case "removeOne":
      //filter out
      return {
        ...state,
        products: payload.newCart,
      };
    case "updateQuantity":
      return {
        ...state,
        products: payload.products,
      };
    case "notfound":
      return {
        ...state,
        products: []
      }
    default:
      return state;
    //     }
    // case "AddToCart":
    // return {
    //     ...state,
    //     products:payload.products;
    // }
  }
};
