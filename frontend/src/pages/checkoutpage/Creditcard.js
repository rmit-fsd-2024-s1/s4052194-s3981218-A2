import React from "react";

const Creditcard = ({ inputClassName, input, handleChange, onSubmit }) => {
  return (
    <>
      <div className="col">
        <div className="row">
          <div className="col-12">
            <label for="" className="form-label valid">
              Name on card
            </label>
            <input
              className={inputClassName("name")}
              name="name"
              type="text"
              placeholder="e.g. BATMAN"
              value={input.name}
              onChange={handleChange}
              autocomplete="cc-csc"
              required
            />
          </div>
          <div className="col mt-3">
            <label for="" className="form-label">
              Credit card number
            </label>
            <input
              className={inputClassName("card")}
              name="credit"
              type="text"
              placeholder="e.g. 1643 3211 2315 9191"
              value={input.credit}
              onChange={handleChange}
              autocomplete="cc-csc"
              required
            />
          </div>
        </div>
        <div className="row mt-6 ">
          <div className="col mt-3">
            <label for="" className="form-label">
              Expiration Date
            </label>
            <input
              className={inputClassName("exp")}
              type="month"
              name="exp"
              placeholder="MM YY"
              value={input.exp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mt-3">
            <label for="" className="form-label">
              CVV
            </label>
            <input
              maxlength="3"
              className={inputClassName("cvv")}
              name="cvv"
              type="text"
              value={input.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <hr></hr>

        <div className="row mt-3">
          {" "}
          <button
            className="text-white border bg-dark p-3 rounded-3 "
            type="submit"
            onClick={onSubmit}
          >
            {" "}
            PAY NOW{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Creditcard;
