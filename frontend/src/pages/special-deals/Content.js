import React from "react";
import Product from "../../components/Product";
import { getData } from "../../services/repository";
const Content = ({ handleClick, items, productIds, head, content }) => {
  //find items from the product ids parameter

  const renderProducts = () => {
    if (items !== null) {
      let findItems = productIds.map((id) => {
        const find = items.filter((item) => item.id === id)[0];
        return find;
      });
      let render = findItems.map((item) => {
        return (
          <>
            <Product
              handleClick={handleClick}
              productId={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              stock={item.stock}
            />
            <div className="p-4"></div>
          </>
        );
      });
      return render;
    }
  };

  return (
    <div className="col">
      <h2>{head}</h2>
      <p>{content}</p>
      <div className="d-flex">{renderProducts()}</div>
    </div>
  );
};

export default Content;
