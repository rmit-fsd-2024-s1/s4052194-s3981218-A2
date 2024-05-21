import React from "react";
import Navbar from "../navbar/Navbar";
import "../../style/header.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import useCart from "../context/CartContext";

//temp

const Header = (props) => {
  const {state} = useCart();
  return (
    <>
      <nav className="navbar navbar-light header-nav py-4">
        <div className="container-fluid justify-space-between ms-5 me-5">
          <Link to="/" className="soil-logo navbar-brand me-5">
            <h1 className="soil-logo d-inline">SOIL</h1>
            <img src={logo} alt="" style={{ width: "100px" }} />
          </Link>
          <form action="">
            <div className="input-group col-md-4 search rounded-pill">
              <input
                className="form-control py-2 border-right-0 rounded-pill"
                type="search"
                placeholder="Find Organic Products.."
                id="example-search-input"
              />
            </div>
          </form>
          <ul className="navbar nav">
            {props.username === null && (
              <li className="nav-item ms-5 me-5">
                <Link to="/login" className={"header-item-style"}>
                  {" "}
                  <i className="fi fi-rr-user"></i> Login
                </Link>
              </li>
            )}
            {props.username === null && (
              <li className="nav-item ms-5 me-5">
                <Link to="/Register" className={"header-item-style"}>
                  {" "}
                  <i className="fi fi-rr-user"></i> Register
                </Link>
              </li>
            )}
            {props.username !== null && (
              <li className="nav-item me-5 username-style">
                {props.username}
                <Link to="/profile" className={"ms-4 header-item-style me-4"}>
                  <i className="fi fi-rs-user-pen"></i> Profile
                </Link>
                <Link to="/cart" className={"header-item-style me-4"}>
                  <i className="fi fi-rr-shopping-cart "></i> Cart
                  {state.products.length > 0 ? (
                    <span className="items-cart">{state.products.length} </span>
                  ) : null}
                </Link>
                <Link
                  to="/login"
                  onClick={props.logout}
                  className={"header-item-style"}
                >
                  <i className="fi fi-rs-sign-out-alt"></i> Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Navbar />
    </>
  );
};

export default Header;
