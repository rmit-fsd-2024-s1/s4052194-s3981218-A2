import React from "react";
import "../style/product.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getData } from "../services/repository";
import { useEffect } from "react";
const Product = (props) => {
  const productInfo = {
    name: props.name,
    price: props.price,
    image: props.image,
    stock: props.stock,
    id: props.productId,
  };

  //disalbed the button
  const [isDisabled, setIsDisabled] = useState(false);
  const addProduct = () => {
    props.handleClick(productInfo, "add");
    setIsDisabled(true);
  };
  //check from localstorage then disabled the button
  const [getLocal, setGetLocal] = useState(getData("transaction") || []);
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    const foundInCart = getLocal.some(
      (product) => product.cart_product.id === productInfo.id
    );
    setAddedToCart(foundInCart);
  }, [getLocal, productInfo.id]);
  return (
    <div className="item text-center font-monospace mb-4">
      <Link className={"menu-style"} to={`/product-page/${props.productId}`}>
        <img src={props.image} alt="" />
        <h4 className="name mt-3">{props.name}</h4>
        <div className="price">$ {props.price}</div>
      </Link>
      {props.stock > 0 ? (
        <button
          type="button"
          onClick={() => addProduct()}
          className={isDisabled || addedToCart ? "addCart disabled" : "addCart"}
          disabled={addedToCart}
        >
          <i className="fi fi-rr-shopping-cart-add"></i>
          {addedToCart || isDisabled ? "Added to Cart" : "Add to Cart"}
        </button>
      ) : (
        <button type="button" className="addCart disabled" disabled>
          <i className="fi fi-rr-shopping-cart-add"></i> Out of stock
        </button>
      )}
    </div>
  );
};

export default Product;
