import React, { useEffect, useState, Link } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";

import {
  validateEmail,
  validateEmailStorage,
  validatePassword,
} from "../../services/verify";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import signupBackground1 from "../../assets/signup-background1.jpg";
import signupBackground2 from "../../assets/signup-background2.jpg";
//import './SignUp.css';

function SignUp(props) {
  useScrollToTop();
  //tracking sign up
  const [isSignedUp, setIsSignedUp] = useState(false);

  //tracking date
  const [dateJoined, setDateJoined] = useState("");
  const current = new Date();

  //for navigation
  const navigate = useNavigate();

  //State to store from values: username, email and password
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    dateJoined: "",
  });
  //State to store error messages
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  //handling the input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleClick = (event) => {
    //prevent default from submission behavior
    event.preventDefault();

    let isValid = true;
    //resetting error messages
    setErrors({ emailError: "", passwordError: "" });

    //checking whether all fields are entered
    if (!values.name.trim() || !values.email.trim() || !values.password) {
      isValid = false;
      alert("All fields are required!!");
    }

    //validating email
    if (!validateEmail(values.email)) {
      isValid = false;
      setErrors((errors) => ({
        ...errors,
        emailError: "Please enter a valid email",
      }));
    }
    if (!validateEmailStorage(values.email)) {
      isValid = false;
      setErrors((errors) => ({
        ...errors,
        emailError: "Email is already registered.",
      }));
    }
    //validating password
    if (!validatePassword(values.password)) {
      isValid = false;
      setErrors((errors) => ({
        ...errors,
        passwordError:
          "Password must be at least 8 characters long and include a mix of up  percase letters, lowercase letters, numbers, and symbols.",
      }));
    }

    if (!isValid) return;

    //using bcrypt hash encode
    //Bcrypt (no date) npm. Available at: https://www.npmjs.com/package/bcrypt (Accessed: 05 April 2024).
    const hashPassword = bcrypt.hashSync(values.password, 10);

    //checking for existing users
    //if not create an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    //setting up yhe date
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    setDateJoined(date);

    //creating a new user
    const newUser = { ...values, password: hashPassword, dateJoined: date };

    //updating the users
    const updatedUsers = [...existingUsers, newUser];

    //saving the updated user array in the local storage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    //clear fields after submission
    setValues({ name: "", email: "", password: "" });

    //setting the active user
    localStorage.setItem("activeUser", JSON.stringify(newUser));

    setIsSignedUp(true);

    //setting a timer
    setTimeout(() => {
      props.loginUser(newUser.name);
      navigate("/");
    });
    return;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h3 className="mb-3" style={{ color: "red" }}>
            Sign Up
          </h3>
          <h5 style={{ fontStyle: "italic" }}>for new deals</h5>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="name"
                name="name"
                placeholder="Enter name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.emailError && (
                <div className="text-danger">{errors.emailError}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.passwordError && (
                <div className="text-danger">{errors.passwordError}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={handleClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm"
              onClick={() => navigate("/login")}
            >
              Already have an account? Sign in
            </button>
          </form>
        </div>
        {/* M. O. contributors Jacob Thornton, and Bootstrap, “Carousel,” getbootstrap.com. https://getbootstrap.com/docs/4.0/components/carousel/ */}
        <Carousel
          className="imf-fluid"
          style={{ maxWidth: "500px", height: "300px", marginBottom: "100px" }}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={signupBackground1}
              alt="First Slide"
            />
            <Carousel.Caption>
              {/* <h3>First Slide Label</h3> */}
              <p>We hanlde with Care</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={signupBackground2}
              alt="Second Slide"
            />
            <Carousel.Caption>
              {/* <h3>Second Slide Label</h3> */}
              <p>
                Just order and wait for a while we’ll be there at your door.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {isSignedUp && (
          <div className="text-center">
            <p>Signed Up successfully. Redirecting to Home page...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { SignUp };
