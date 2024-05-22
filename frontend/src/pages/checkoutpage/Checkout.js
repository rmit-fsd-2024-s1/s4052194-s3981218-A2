import React from "react";
import Creditcard from "./Creditcard";
import { useState, useEffect } from "react";
import ProductSummary from "./ProductSummary";
import { initTransaction } from "../../services/repository";
import { setData } from "../../services/repository";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { getData } from "../../services/repository";
import useCart from "../../fragments/context/CartContext";
import useCreditCardValidation from "./useCreditCardValidation";
const Checkout = () => {
  const { state, userId } = useCart();
  const { inputClassName, input, handleChange, onSubmit } =
    useCreditCardValidation();
  return (
    <div className="mt-5">
      <nav aria-label="breadcrumb" className="ms-5 mt-5">
        <ol className="breadcrumb ms-2">
          <li className="breadcrumb-item ">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item ">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Checkout
          </li>
        </ol>
      </nav>
      {userId === null ? (
        <div className="mx-5 m-5 text-center">
          <h1>Checkout</h1>
          You are not logged in.
        </div>
      ) : (
        <form action="">
          <div className="container text-center mt-5">
            <h1>Checkout</h1>
            <div className="container my-5">
              <div className="row">
                {/* credit card info */}
                <div className="col">
                  <Creditcard
                    inputClassName={inputClassName}
                    input={input}
                    handleChange={handleChange}
                    onSubmit={onSubmit}
                  />
                </div>
                {/* show products */}
                <ProductSummary />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
