import React from "react";
import { useState, useEffect, useRef } from "react";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { getData } from "../../services/repository";
import "../../style/cart.css";
import { Link } from "react-router-dom";
import ProductSection from "./ProductSection";
const Cart = () => {
  return (
    <div>
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
      <ProductSection />
    </div>
  );
};

export default Cart;
