import React from "react";
import "../style/banner.css";
import { Link } from "react-router-dom";
//Banner with image,text and link
const Banner = ({
  img,
  text = "Organic product specials & small-scale farming",
  linkto,
}) => {
  return (
    <>
      <div className="banner-container rounded-3 mx-5 d-flex align-items-center">
        <div className="banner-image flex-fill">
          <img
            className="rounded-3"
            src="banner2.png"
            alt=""
            style={{ width: "300px", height: "250px" }}
          />
        </div>
        <div className="banner-content p-3 w-100 d-flex justify-content-around">
          <div className="content">
            <h3>{text}</h3>
          </div>
          <button className="link rounded-pill">
            <Link to={linkto}>Check it out</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
