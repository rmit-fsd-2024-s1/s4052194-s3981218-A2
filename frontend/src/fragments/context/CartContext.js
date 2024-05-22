import {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  addCart,
  getCartById,
  removeOne,
  updateCart,
} from "../../services/cartService";
import { cartReducer } from "../reducer/cartReducer";
const CartContext = createContext();
const initialState = {
  products: [],
};
export const CartProvider = ({ children,userId }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  //fetch data
  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const products = await getCartById(userId); // get user id!
        dispatch({
          type: "InitProduct",
          payload: {
            products: products.data,
          },
        });
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchInitData();
  }, []);
//add to cart function
  const addToCart = async (product) => {
    try {
      //call api
      await addCart(product);
      //update state
      dispatch({
        type: "AddToCart",
        payload: {
          products: product,
        },
      });
    } catch (error) {
      console.error("Error adding cart:", error);
    }
    //if added successfully
  };
  const removeFromCart = async (items) => {
    try {
      //call api
      await removeOne(items);
      //update state
      const cartUpdate = state.products.filter(
        (inCart) =>
          inCart.cart_id !== items.cart_id &&
          inCart.product_id !== items.product_id
      );
      dispatch({
        type: "removeOne",
        payload: {
          newCart: cartUpdate,
        },
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  //update quantity
  const updateQuantity = async (items, ops) => {
    try {
      console.log(state.products);
      const cartUpdate = state.products.map((inCart) =>
        inCart.cart_id === items.cart_id &&
        inCart.product_id === items.product_id
          ? ops === "plus"
            ? { ...inCart, quantity: inCart.quantity + 1 }
            : { ...inCart, quantity: inCart.quantity - 1 }
          : inCart
      );
      let item = cartUpdate.find(
        (product) =>
          product.cart_id === items.cart_id &&
          product.product_id === items.product_id
      );
      console.log(item)
      await updateCart(item);

      dispatch({
        type: "updateQuantity",
        payload: {
          products: cartUpdate,
        },
      });
      console.log("after clicking it ", state.products);
    } catch (error) {
      console.log(error.message);
      console.error("Error updating item from cart:", error);
    }
  };
  //monitor change
  const value = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    userId
  };
  console.log("latest state", value.state);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
export default useCart;
