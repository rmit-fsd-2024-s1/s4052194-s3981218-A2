import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../style/productstyle.css";
import { useState, useEffect } from "react";
import Review from "../../components/Review";
import useProducts from "../../fragments/context/ProductContext";
import useCart from "../../fragments/context/CartContext";
import { getAllReviews } from "../../services/reviewService";
import useReview from "../../fragments/customHook/useReview";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
const Productpage = ({username}) => {
  const { specialProducts, products, loading } = useProducts();
  const { urlId } = useParams();
  const { state, addToCart, userId } = useCart();
  useScrollToTop();
  const [isDisabled, setIsDisabled] = useState(false);
  //    setIsDisabled(true);
  useEffect(() => {
    state.products.map((item) => {
      if (item.product_id === parseInt(urlId, 10)) {
        setIsDisabled(true);
      }
    });
  }, [state]);
  if (loading) {
    return <div>Loading...</div>;
  }
  const product = products.filter(
    (product) => product.product_id === parseInt(urlId, 10)
  );
  const {
    product_id,
    product_name,
    product_image,
    product_stock,
    product_price,
  } = product[0];

  const getSpecialId = specialProducts.map((e) => e.product_id);
  const isSpecial = getSpecialId.includes(product_id);

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
            <img src={product_image} alt="" width="75%" />
          </div>
          <div className="col">
            {isSpecial ? (
              <p className="special-text bg-warning w-50 ">special product</p>
            ) : (
              ""
            )}
            <p className="fs-1 fw-bolder">{product_name}</p>
            <p className="fs-3">$ {product_price}</p>
            {product_stock === 0 ? (
              <button className="addToCartbtn rounded-pill disabled">
                {" "}
                <i className="fi fi-rr-shopping-cart-add"></i> Out of stock
              </button>
            ) : !isDisabled ? (
              <button
                className="addToCartbtn rounded-pill"
                onClick={() =>
                  addToCart({
                    user_id: userId,
                    product_id: product_id,
                    quantity: 1,
                    product: product[0],
                  })
                }
              >
                <i className="fi fi-rr-shopping-cart-add"></i> Add To Cart
              </button>
            ) : (
              <button className="addToCartbtn rounded-pill disabled">
                {" "}
                <i className="fi fi-rr-shopping-cart-add"></i> Added To Cart
              </button>
            )}
          </div>{" "}
        </div>
        <Review productId={parseInt(urlId, 10)} ></Review>
      </div>
      <div className="addspace"></div>
    </div>
  );
};

export default Productpage;
