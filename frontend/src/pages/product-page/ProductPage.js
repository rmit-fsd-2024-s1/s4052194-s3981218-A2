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
  console.log("test", products);
  const { urlId } = useParams();
  const [loadedProducts, setLoadedProducts] = useState(products);
  useEffect(() => {
    setLoadedProducts(products);
  }, [products]);
  console.log(loadedProducts);
  const [isDisabled, setIsDisabled] = useState(false);

  const findProduct = loadedProducts && loadedProducts.filter(
    (product) => product.product_id === parseInt(urlId, 10)
  );
  console.log(findProduct[0].product_id)
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

      {/* <div className="container my-5 font-monospace">
        <div className="row row-cols-2">
          <div className="col">
            <img src={"/" + product_image} alt="" width="75%" />
          </div>
          <div className="col">
            <p className="fs-1 fw-bolder">{product_name}</p>
            <p className="fs-3">$ {product_price}</p>
            <button className="addToCartbtn rounded-pill">
                <i className="fi fi-rr-shopping-cart-add"></i> test
              </button> */}
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
    //     </div>
    //   </div>
    //   <div className="addspace"></div>
    // </div>
  );
};

export default Productpage;
