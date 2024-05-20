import React from "react";

const ProductSummary = ({ items }) => {
  return (
    <div className="col">
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-dark">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {items.map((cart) => {
            return (
              <tr>
                <th scope="row" className="fw-normal font-monospace">
                  {cart.cart_product.name}
                </th>
                <td className="fw-normal font-monospace">
                  {cart.cart_product.price}
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="rounded-3 p-4 justify-content-center">
        <h2>Total</h2>
        <h3 className="font-monospace">
          $
          {items.reduce((total, cart) => {
            return Math.round((total + cart.cart_product.price) * 100) / 100;
          }, 0)}
        </h3>
      </div>
    </div>
  );
};

export default ProductSummary;
