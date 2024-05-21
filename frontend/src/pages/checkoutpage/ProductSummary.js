import React from "react";
import useCart from "../../fragments/context/CartContext";
const ProductSummary = () => {
  const { state } = useCart();
  return (
    <div className="col">
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-dark">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {state.products.map((item) => {
            return (
              <tr key={item.product.product_id}>
                <th scope="row" className="fw-normal font-monospace">
                  {item.product.product_name}
                </th>
                <td className="fw-normal font-monospace">
                  {item.product.product_price}
                </td>
                <td className="fw-normal font-monospace">
                  {item.quantity}
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
          {state.products.reduce((total, cart) => {
            return (
              Math.round(
                (total + cart.product.product_price * cart.quantity) * 100
              ) / 100
            );
          }, 0)}
        </h3>
      </div>
    </div>
  );
};

export default ProductSummary;
