import { React, useState, useEffect } from "react";
import { getData } from "../../services/repository";
import { Link } from "react-router-dom";
import useCart from "../../fragments/context/CartContext";
const Thankyou = () => {
  const {state,checkOut,userId} = useCart();
  //remove the items from the cart/db
  const [receipt,setReceipt] = useState([]);
  //reset
  useEffect( () => {
    setReceipt(state.products)
    checkOut();
  }, [userId]);
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
                {receipt.map((items) => {
                  return (
                    <tr>
                      <th scope="row" className="fw-normal font-monospace">
                        {items.product.product_name}
                      </th>
                      <td className="fw-normal font-monospace">
                        {items.product.product_price}
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
                {receipt.reduce((total, cart) => {
                  return (
                    Math.round((total + cart.product.product_price) * 100) / 100
                  );
                }, 0)}
              </h3>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Thankyou;
