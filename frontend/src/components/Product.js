import React from "react";
import "../style/product.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getData } from "../services/repository";
import { useEffect } from "react";
import useCart from "../fragments/context/CartContext";
const Product = (props) => {
  const { state, addToCart } = useCart();
  console.log(state);
  //disalbed the button
  const [isDisabled, setIsDisabled] = useState(false);
  //    setIsDisabled(true);
  console.log("test", state);
  useEffect(() => {
    state.products.map((item) => {
      if (item.product_id === props.productId) {
        console.log(props.productId);
        setIsDisabled(true);
      }
    });
  }, [state]);
  return (
    <div className="item text-center font-monospace mb-4">
      <Link className={"menu-style"} to={`/product-page/${props.productId}`}>
        <img src={props.image} alt="" />
        <h4 className="name mt-3">{props.name}</h4>
        <div className="price">$ {props.price}</div>
      </Link>
      {console.log(props.name, "is", isDisabled)}
      {!isDisabled ? (
        <button
          type="button"
          onClick={() =>
            addToCart({
              user_id: 2,
              product_id: props.productId,
              quantity: 1,
              product: {
                product_price: props.price,
                product_name: props.name,
                product_id: props.id,
                product_img: props.image,
                product_stock: props.stock,
              },
            })
          }
          className={"addCart"}
        >
          <i className="fi fi-rr-shopping-cart-add"></i> Add To Cart
        </button>
      ) : (
        <button type="button" className="addCart disabled" disabled>
          <i className="fi fi-rr-shopping-cart-add"></i> Add To Cart
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
