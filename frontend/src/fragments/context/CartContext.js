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
  clearCart,
} from "../../services/cartService";
import { useNavigate } from "react-router-dom";
import { cartReducer } from "../reducer/cartReducer";
const CartContext = createContext();

const initialState = {
  products: [],
};
export const CartProvider = ({ children, userId }) => {
  const navigate = useNavigate();
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
        //reset the cart state
        dispatch({
          type: "reset",
        });
        console.error("Error fetching cart data:", error);
      }
    };
    fetchInitData();
  }, [userId]);
  //add to cart function
  const addToCart = async (product) => {
    try {
      if (userId === null) {
        alert("You need to log in first");
        return navigate("/login");
      }
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
  const removeFromCart = async (item) => {

    try {
      //call api
      await removeOne(item);
      //update state
      const cartUpdate = state.products.filter(
        (inCart) =>
          inCart.product_id !== item.product_id
      );
      console.log('xxx',cartUpdate)
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
      await updateCart(item);

      dispatch({
        type: "updateQuantity",
        payload: {
          products: cartUpdate,
        },
      });
    } catch (error) {
      console.log(error.message);
      console.error("Error updating item from cart:", error);
    }
  };
  //checked out successfully then we'll reset state and remove items from db
  const checkOut = async () => {
    dispatch({ type: "reset" });
    try {
      await clearCart(userId);
    } catch (error) {
      console.log(error.message);
    }
  };
  //monitor change
  const value = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    userId,
    checkOut,
  };
  console.log("latest state", value.state);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
export default useCart;
