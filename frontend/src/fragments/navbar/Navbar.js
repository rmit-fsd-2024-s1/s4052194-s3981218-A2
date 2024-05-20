import React from "react";
import { Link } from "react-router-dom";
import "../../style/nav.css";
import NavItem from "./NavItem";
const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light menu-nav">
      <div className="container-fluid justify-content-start ms-5 me-5 mt-0">
        <ul className="navbar nav">
          <NavItem content="Home" linkto="/" />
          <NavItem content="Special Products" linkto="/special" />
          <NavItem content="Shop Online" linkto="/shop-online" />
          <NavItem content="Diet Plan" linkto="/dietplanpage" />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
