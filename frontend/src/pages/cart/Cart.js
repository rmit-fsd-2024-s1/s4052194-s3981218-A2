import React from "react";
import { useState, useEffect, useRef } from "react";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { getData } from "../../services/repository";
import "../../style/cart.css";
import { Link } from "react-router-dom";
import ProductSection from "./ProductSection";
import useCart from "../../fragments/context/CartContext";
const Cart = () => {
  const { state, addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <div>
      {console.log("INSIDE", state.products)}
      {state.products.map((product) => {
        return (
          <div>
            product id:
            {product.product_id} user id : {product.user_id} quantity;
            {product.quantity}
            <button onClick={() => removeFromCart(product)}> delete </button>
            <div class="input-group mb-3">
              <span
                class="input-group-text"
                onClick={() => product.quantity !== 1 ? updateQuantity(product, "minus") : ""}
              >
                -
              </span>
              <input
                type="text"
                class="form-control"
                key={product.product_id}
                value={product.quantity}
              />
              <span
                class="input-group-text"
                onClick={() => updateQuantity(product, "plus")}
              >
                +
              </span>
            </div>
          </div>
        );
      })}
      <button
        onClick={() =>
          addToCart({
            user_id: 2,
            product_id: 2,
            quantity: 999999,
          })
        }
      >
        TEST ADD TO CART
      </button>
      <nav aria-label="breadcrumb" className="ms-5 mt-5">
        <ol className="breadcrumb ms-2">
          <li className="breadcrumb-item ">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>

      <div className="container text-center mt-5">
        <h1>Shopping Cart</h1>
      </div>
      {/* <ProductSection
      /> */}
    </div>
  );
};

export default Cart;
