import React from "react";
import NavItem from "../../fragments/navbar/NavItem";
import { useNavigate } from "react-router-dom";
import useCart from "../../fragments/context/CartContext";
const ProductSection = () => {
  const navigate = useNavigate();
  const { state, removeFromCart, updateQuantity } = useCart();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <>
      {state.products.length > 0 ? (
        <div className="container mt-3 mb-5 p-5">
          <div className="row">
            <div className="col-8">
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-dark">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove</th>
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
                          <div class="input-group mb-3 w-75">
                            <span
                              class="input-group-text"
                              onClick={() =>
                                item.quantity !== 1
                                  ? updateQuantity(item, "minus")
                                  : ""
                              }
                            >
                              -
                            </span>
                            <input
                              type="text"
                              class="form-control text-center"
                              key={item.product.product_id}
                              value={item.quantity}
                            />
                            <span
                              class="input-group-text"
                              onClick={() => updateQuantity(item, "plus")}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <span
                            className="remove"
                            onClick={() => removeFromCart(item)}
                          >
                            remove
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col border d-flex flex-column rounded-3 align-items-center border-dark border-1 p-4">
              <h2>Total</h2>
              <h3 className="font-monospace">
                $
                {state.products.reduce((total, cart) => {
                  console.log(cart.product)
                  return (
                    Math.round((total + (cart.product.product_price * cart.quantity)) * 100) / 100
                  );
                }, 0)}
              </h3>
              <div className="flex-grow-1 ">
                <button
                  className=" flex-grow-1 mt-3 p-3 rounded-pill btn btn-dark"
                  onClick={() => handleCheckout()}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-5 m-5">Your cart is currently empty.</div>
      )}
    </>
  );
};

export default ProductSection;
