import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="heading text-center mt-5 px-5">
      <h2>{title} </h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default Heading;
