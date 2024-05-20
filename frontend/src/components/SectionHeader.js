import React from "react";
import { Link } from "react-router-dom";
import "../style/sectionHeader.css";

const SectionHeader = ({ title, link, subtitle }) => {
  return (
    <div className="heading mx-5 px-4 d-flex justify-content-between">
      <h2>{title} </h2>
      <Link className="subtitle" to={link}>
        {subtitle}
      </Link>
    </div>
  );
};
export default SectionHeader;
