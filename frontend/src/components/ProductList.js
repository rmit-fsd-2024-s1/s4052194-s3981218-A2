import React from "react";
import Product from "./Product";

const ProductList = ({ list }) => {
  let products = list || [];
  return (
    <div className="container">
      <div className="row">
        {products.map((item) => { 
          return (
            <div className="col" key={item.id}>
              <Product
                product_name={item.product_name}
                product_price={item.product_price}
                product_image={item.product_image}
                product_id={item.product_id}
                product_stock={item.product_stock}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
