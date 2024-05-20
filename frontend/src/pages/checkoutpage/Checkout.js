import React from "react";
import Creditcard from "./Creditcard";
import { useState, useEffect } from "react";
import ProductSummary from "./ProductSummary";
import { initTransaction } from "../../services/repository";
import { setData } from "../../services/repository";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { getData } from "../../services/repository";
const Checkout = ({
  currentUserCartItems,
  currentUser,
  handleCheckOutClick,
  setInitProducts,
}) => {
  console.log(currentUser);
  console.log(currentUserCartItems);
  initTransaction();
  const [input, setInput] = useState({
    name: "",
    credit: "",
    exp: "",
    cvv: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  //name validation
  const [checkName, setCheckName] = useState(false);
  let regexName = /^[a-zA-Z ]+$/;
  const isNameValid = regexName.test(input.name) && input.name.length >= 3;

  //validation
  useEffect(() => {
    if (input.name.length > 0 && isNameValid) {
      setCheckName(true);
    } else {
      setCheckName(false);
    }

    if (input.credit.length > 0 && isCardValid) {
      setCheckCreditCard(true);
    } else {
      setCheckCreditCard(false);
    }

    if (input.exp.length > 0 && isExpValid()) {
      setCheckDate(true);
    } else {
      setCheckDate(false);
    }

    if (input.cvv.length > 0 && isCvvValid) {
      setCheckCvv(true);
    } else {
      setCheckCvv(false);
    }
  }, [input]);

  //creditcard validation
  const [checkCreditCard, setCheckCreditCard] = useState(false);
  let regexNumber = /^[0-9]+$/;
  //ref https://javascript.plainenglish.io/how-to-build-a-credit-card-user-interface-with-validation-in-javascript-4f190b6208ad
  //ex valid 4263982640269299
  const luhnAlgo = (cardNumber) => {
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };
  const isCardValid =
    regexNumber.test(input.credit) &&
    input.credit.length === 16 &&
    luhnAlgo(input.credit.toString());
  //date validation
  const [checkDate, setCheckDate] = useState(false);
  const isExpValid = () => {
    let dateToday = new Date();
    let month = dateToday.getMonth() + 1;
    let year = dateToday.getFullYear();
    if (month < 10) {
      month = "0" + month.toString();
    }
    return year.toString() + "-" + month <= input.exp;
  };

  //cvv validation
  const [checkCvv, setCheckCvv] = useState(false);
  const isCvvValid = regexNumber.test(input.cvv) && input.cvv.length === 3;

  //change class
  const inputClassName = (field) => {
    if (field === "name") {
      if (input.name.length === 0) {
        return "form-control";
      }
      if (isNameValid) {
        return "form-control is-valid";
      } else {
        return "form-control is-invalid";
      }
    } else if (field === "card") {
      if (input.credit.length === 0) {
        return "form-control";
      }
      if (isCardValid) {
        return "form-control is-valid";
      } else {
        return "form-control is-invalid";
      }
    } else if (field === "cvv") {
      if (input.cvv.length === 0) {
        return "form-control";
      }
      if (isCvvValid) {
        return "form-control is-valid";
      } else {
        return "form-control is-invalid";
      }
    } else if (field === "exp") {
      if (input.exp.length === 0) {
        return "form-control";
      }
      if (isExpValid()) {
        return "form-control is-valid";
      } else {
        return "form-control is-invalid";
      }
    } else {
      return "form-control is-invalid";
    }
  };
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (checkCreditCard && checkDate && checkCvv && checkName) {
      handleCheckOutClick(true);
      navigate("/thankyou");
      const updateStock = (id) => {
        const products = getData("Products");
        products.map((each) => {
          if (each.id === id) {
            return (each.stock -= 1);
          }
        });
        setInitProducts(products);
        localStorage.setItem("Products", JSON.stringify(products));
      };
      //update product
      currentUserCartItems.map((k) => {
        updateStock(k.cart_product.id);
      });
      console.log(currentUserCartItems);
    } else {
      //add class 'is-invalid' to all inputs
      const form = event.currentTarget.closest("form");
      const inputs = form.querySelectorAll("input");
      inputs.forEach((input) => {
        if (!input.classList.contains("is-valid")) {
          input.classList.add("is-invalid");
        }
      });
    }
  };
  return (
    <div className="mt-5">
      <nav aria-label="breadcrumb" className="ms-5 mt-5">
        <ol className="breadcrumb ms-2">
          <li className="breadcrumb-item ">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item ">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Checkout
          </li>
        </ol>
      </nav>
      {currentUser === null ? (
        <div className="mx-5 m-5 text-center">
          <h1>Checkout</h1>
          You are not logged in.
        </div>
      ) : (
        <form action="">
          <div className="container text-center mt-5">
            <h1>Checkout</h1>
            <div className="container my-5">
              <div className="row">
                {/* credit card info */}
                <div className="col">
                  <Creditcard
                    inputClassName={inputClassName}
                    input={input}
                    handleChange={handleChange}
                    onSubmit={onSubmit}
                  />
                </div>
                {/* show products */}
                <ProductSummary items={currentUserCartItems} />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
