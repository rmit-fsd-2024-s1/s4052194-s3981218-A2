import React from "react";
import NavItem from "../../fragments/navbar/NavItem";
import { useNavigate } from "react-router-dom";
const ProductSection = ({ activeUserCart, handleRemove }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    console.log(activeUserCart);
    navigate("/checkout");
  };
  return (
    <>
      {activeUserCart.length > 0 ? (
        <div className="container mt-3 mb-5 p-5">
          <div className="row">
            <div className="col-8">
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-dark">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {activeUserCart.map((cart) => {
                    return (
                      <tr>
                        <th scope="row" className="fw-normal font-monospace">
                          {cart.cart_product.name}
                        </th>
                        <td className="fw-normal font-monospace">
                          {cart.cart_product.price}
                        </td>
                        <td>
                          <span
                            className="remove "
                            onClick={() =>
                              handleRemove(
                                {
                                  name: cart.cart_product.name,
                                  id: cart.cart_product.id,
                                  price: cart.cart_product.price,
                                }
                                // ,"delete"
                              )
                            }
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
                {activeUserCart.reduce((total, cart) => {
                  return (
                    Math.round((total + cart.cart_product.price) * 100) / 100
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
