import React from "react";
import "../../style/footer.css";
const Footer = () => {
  return (
    <>
      <footer className="row justify-content-center bg-footer mt-5">
        <div className="col-md-4">
          <h5>SOIL is a long-term organic food grocer.</h5>
          <div className="col-md-6">
            <ul>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Shipping</li>
              <li>Privacy & Return</li>
              <li>Shipping</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <h5>MARKET HOURS</h5>
          <div className="row">
            <div className="col-md-4">
              <ul>
                <li>Monday </li>
                <li>Tuesday</li>
                <li>Wednesday </li>
                <li>Saturday</li>
                <li>Sunday</li>
              </ul>
            </div>
            <div className="col-md-5">
              <ul>
                <li>10am - 10pm </li>
                <li>10am - 10pm </li>
                <li>10am - 10pm </li>
                <li>10am - 10pm </li>
                <li>10am - 10pm </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
