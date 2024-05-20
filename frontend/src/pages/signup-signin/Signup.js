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
import { useForm } from "../../fragments/customHook/useForm";

//import './SignUp.css';

function SignUp(props) {
  useScrollToTop();
  const navigate = useNavigate(); 
  const [isSignedUp, setIsSignedUp] = useState(false); // State to handle the sign-up status

  const current = new Date(); // Current date
  const { values, errors, handleChange, validateForm, resetForm } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateJoined: "",
    },
    (name, value, values) => {
      let error = "";
      if (name === "email") {
        if (!validateEmail(value)) {
          error = "Please enter a valid email"; // Email validation
        } else if (!validateEmailStorage(value)) {
          error = "Email is already registered."; // Check if email is already registered
        }
      } else if (name === "password") {
        if (!validatePassword(value)) {
          error = "Password must be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols."; // Password validation
        }
      } else if (name === "confirmPassword") {
        if (value !== values.password) {
          error = "Passwords do not match."; // Confirm password validation
        }
      }
      return error;
    }
  );

  const handleClick = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!validateForm()) {
      return; // Return early if form validation fails
    }

    const hashPassword = bcrypt.hashSync(values.password, 10); // Hash the password

    const existingUsers = JSON.parse(localStorage.getItem("users")) || []; // Get existing users from localStorage
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`; // Format the current date

    const newUser = { ...values, password: hashPassword, dateJoined: date }; // Create new user object

    const updatedUsers = [...existingUsers, newUser]; // Add new user to the list of existing users
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save updated user list to localStorage

    resetForm(); // Reset form values
    localStorage.setItem("activeUser", JSON.stringify(newUser)); // Set active user in localStorage
    setIsSignedUp(true); // Set sign-up status to true

    // Redirect to home page after a short delay
    setTimeout(() => {
      props.loginUser(newUser.name); // Call loginUser prop function
      navigate("/"); // Navigate to home page
    }, 1000);
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
                onChange={handleChange} // Handle input change
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
                onChange={handleChange} // Handle input change
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div> // Display email error
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
                onChange={handleChange} // Handle input change
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div> // Display password error
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange} // Handle input change
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div> // Display confirm password error
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={handleClick} // Handle form submission
            >
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm"
              onClick={() => navigate("/login")} // Navigate to login page
            >
              Already have an account? Sign in
            </button>
          </form>
        </div>
        <Carousel
          className="img-fluid"
          style={{ maxWidth: "500px", height: "300px", marginBottom: "100px" }}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={signupBackground1}
              alt="First Slide"
            />
            <Carousel.Caption>
              <p>We handle with Care</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={signupBackground2}
              alt="Second Slide"
            />
            <Carousel.Caption>
              <p>Just order and wait for a while, we’ll be there at your door.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {isSignedUp && (
          <div className="text-center">
            <p>Signed Up successfully. Redirecting to Home page...</p> {/* Display sign-up success message */}
          </div>
        )}
      </div>
    </div>
  );
}

export { SignUp };
