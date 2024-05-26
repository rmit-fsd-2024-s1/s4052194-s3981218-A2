import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light menu-nav">
      <div className="container-fluid justify-content-start ms-5 me-5 mt-0">
        <ul className="navbar nav">
          <li className="nav-item me-5">
            <Link className="nav-link" to="/">
              Main
            </Link>
          </li>
          <li className="nav-item me-5">
            <Link className="nav-link" to="/user">
              Users
            </Link>
          </li>
          <li className="nav-item me-5">
            <Link className="nav-link" to="/product">
              Products
            </Link>
          </li>
          <li className="nav-item me-5">
            <Link className="nav-link" to="/review">
              Reviews
            </Link>
          </li>
          <li className="nav-item me-5">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
