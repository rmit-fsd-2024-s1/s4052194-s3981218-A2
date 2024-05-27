import React from "react";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import ProductList from "../../components/ProductList";
import { Link } from "react-router-dom";
import useProducts from "../../fragments/context/ProductContext";

const ShopOnline = () => {
  const {products,loading} = useProducts();
  if (loading) {
    return <div>Loading...</div>; 
  }
  return (
    <div>
      <nav aria-label="breadcrumb" className="ms-5 mt-5">
        <ol className="breadcrumb ms-2">
          <li className="breadcrumb-item ">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Shop Online</li>
        </ol>
      </nav>
      <div className="text-center mt-5">
        <h2>Shop Online</h2>
        <div className="my-5"></div>
        <ProductList
          list={products}
        />
      </div>
    </div>
  );
};

export default ShopOnline;
