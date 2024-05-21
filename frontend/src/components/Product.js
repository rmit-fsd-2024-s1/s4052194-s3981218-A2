import React from "react";
import "../style/product.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getData } from "../services/repository";
import { useEffect } from "react";
import useCart from "../fragments/context/CartContext";
const Product = (props) => {
  const { state, addToCart } = useCart();
  //disalbed the button
  const [isDisabled, setIsDisabled] = useState(false);
  //    setIsDisabled(true);
  useEffect(() => {
    state.products.map((item) => {
      if (item.product_id === props.product_id) {
        setIsDisabled(true);
      }
    });
  }, [state]);
  return (
    <div className="item text-center font-monospace mb-4">
      <Link className={"menu-style"} to={`/product-page/${props.product_id}`}>
        <img src={props.product_image} alt="" />
        <h4 className="name mt-3">{props.product_name}</h4>
        <div className="price">$ {props.product_price}</div>
      </Link>
      {props.product_stock === 0 ? (
        <button className="addCart disabled">
          {" "}
          <i className="fi fi-rr-shopping-cart-add"></i> Out of stock
        </button>
      ) : !isDisabled ? (
        <button
          className="addCart"
          onClick={() =>
            addToCart({
              user_id: 2,
              product_id: props.product_id,
              quantity: 1,
              product: props,
            })
          }
        >
          <i className="fi fi-rr-shopping-cart-add"></i> Add To Cart
        </button>
      ) : (
        <button className="addCart disabled">
          {" "}
          <i className="fi fi-rr-shopping-cart-add"></i> Added To Cart
        </button>
      )}

      {/* {props.stock > 0 || !isDisabled ? (
        <button
          type="button"
          onClick={() =>
            addToCart({
              user_id: 2,
              product_id: props.productId,
              quantity: 1,
            })
          }
          className={"addCart"}
          
        >
          <i className="fi fi-rr-shopping-cart-add"></i> Add To Cart
        </button>
      ) : (
        <button type="button" className="addCart disabled" disabled>
          <i className="fi fi-rr-shopping-cart-add"></i> Out of stock
        </button>
      )} */}
    </div>
  );
};

export default Product;
