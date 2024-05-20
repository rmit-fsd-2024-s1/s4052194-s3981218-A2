import { React, useState, useEffect } from "react";
import { getData } from "../../services/repository";
import { Link } from "react-router-dom";
const Thankyou = ({
  currentUserCartItems,
  currentUser,
  clickCheckOut,
  setItems,
}) => {
  const [cartData, setCartData] = useState(getData("all_users_cart_data"));
  const newData = cartData.filter((allUsers) => {
    return allUsers.email !== currentUser.email;
  });
  useEffect(() => {
    setItems(newData);
  }, []);
  const showReceipt = cartData.filter((allUsers) => {
    return allUsers.email === currentUser.email;
  });
  return (
    <div>
      <nav aria-label="breadcrumb" className="ms-5 mt-5">
        <ol className="breadcrumb ms-2">
          <li className="breadcrumb-item ">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item ">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="breadcrumb-item ">
            <Link to="/checkout">Checkout</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Thank you
          </li>
        </ol>
      </nav>
      {clickCheckOut ? (
        <div className="container mt-3 mb-5 p-5">
          <h2>Thank you for your purchase</h2>
          <h4>Your order was completed successfully</h4>
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
                {showReceipt.map((cart) => {
                  return (
                    <tr>
                      <th scope="row" className="fw-normal font-monospace">
                        {cart.cart_product.name}
                      </th>
                      <td className="fw-normal font-monospace">
                        {cart.cart_product.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="col d-flex flex-column rounded-3 border-dark border-1 p-4">
              <h2>Total</h2>
              <h3 className="font-monospace">
                $
                {showReceipt.reduce((total, cart) => {
                  return (
                    Math.round((total + cart.cart_product.price) * 100) / 100
                  );
                }, 0)}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <h4>Please go back and finish your checkout step</h4>
        </div>
      )}
    </div>
  );
};

export default Thankyou;
