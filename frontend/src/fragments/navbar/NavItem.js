import React from "react";
import { Link } from "react-router-dom";
import "../../style/nav.css";

const NavItem = ({ content, linkto }) => {
  return (
    <>
      <li className="nav-item me-5">
        <Link className={"menu-style"} to={linkto}>
          {content}
        </Link>
      </li>
    </>
  );
};

export default NavItem;
