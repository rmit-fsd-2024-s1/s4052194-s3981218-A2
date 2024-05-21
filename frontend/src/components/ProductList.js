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
                name={item.product_name}
                price={item.product_price}
                image={item.product_image}
                productId={item.product_id}
                stock={item.product_stock}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
