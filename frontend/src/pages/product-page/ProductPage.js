import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../style/productstyle.css";
import { getData } from "../../services/repository";
import Button from "react-bootstrap/esm/Button";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { getAllProducts } from "../../services/productData";
import { useState, useEffect } from "react";
import Review from "../../components/Review";
import useProducts from "../../fragments/context/ProductContext";

const Productpage = () => {
  const products = useProducts();
  console.log('test',products)
  const { urlId } = useParams();

  const [isDisabled, setIsDisabled] = useState(false);
  //check from localstorage then disabled the button
  const items = [{id:1,name:"x",price:20,stock:1,image:'x'}]
  const findProduct = items.filter(
    (product) => product.id === parseInt(urlId, 10)
  );
  if (findProduct.length === 0) {
    return "Product not found";
  }
  const { id, name, price, image, stock } = findProduct[0];

  const productInfo = {
    name: name,
    price: price,
    image: image,
    id: id,
    stock: stock,
  };

  return (
    <div>
      <nav aria-label="breadcrumb" className="ms-5 mt-5">
        <ol className="breadcrumb ms-2">
          <li className="breadcrumb-item ">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/shop-online">Shop Online</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Product Page
          </li>
        </ol>
      </nav>

      <div className="container my-5 font-monospace">
        <div className="row row-cols-2">
          <div className="col">
            <img src={"/" + image} alt="" width="75%" />
          </div>
          <div className="col">
            <p className="fs-1 fw-bolder">{name}</p>
            <p className="fs-3">$ {price}</p>
            <button className="addToCartbtn rounded-pill">
                <i className="fi fi-rr-shopping-cart-add"></i> test
              </button>
            {/* {stock > 0 ? (
              <button
                onClick={() => addProduct(productInfo)}
                className={
                  isDisabled || addedToCart
                    ? "addToCartbtn rounded-pill disabled"
                    : "addToCartbtn rounded-pill"
                }
              >
                <i className="fi fi-rr-shopping-cart-add"></i>{" "}
                {isDisabled || addedToCart ? " Added To Cart" : "Add To Cart"}
              </button>
            ) : (
              <button className="addToCartbtn rounded-pill disabled">
                <i className="fi fi-rr-shopping-cart-add"></i> Out of stock
              </button>
            )} */}
            <Review></Review>
          </div>
        </div>
      </div>
      <div className="addspace"></div>
    </div>
  );
};

export default Productpage;
