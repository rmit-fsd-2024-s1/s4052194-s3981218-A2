import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { useForm } from "../../fragments/customHook/useForm";
import { useNavigate } from "react-router-dom";
import signupBackground1 from "../../assets/signup-background1.jpg";
import signupBackground2 from "../../assets/signup-background2.jpg";
import {
  validateEmail,
  validateEmailStorage,
  validatePassword,
} from "../../services/verify";

function SignUp(props) {
  useScrollToTop();
  const navigate = useNavigate();
  const [isSignedUp, setIsSignedUp] = useState(false);

  const { values, errors, handleChange, validateForm, resetForm } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    (name, value, values) => {
      let error = "";
      if (name === "email") {
        if (!validateEmail(value)) {
          error = "Please enter a valid email";
        } else if (!validateEmailStorage(value)) {
          error = "Email is already registered.";
        }
      } else if (name === "password") {
        if (!validatePassword(value)) {
          error = "Password must be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols.";
        }
      } else if (name === "confirmPassword") {
        if (value !== values.password) {
          error = "Passwords do not match.";
        }
      }
      return error;
    }
  );

  const handleClick = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/users", {
        username: values.name,
        email: values.email,
        password: values.password,
        is_admin: false,
      });

      const newUser = response.data;

      // Store the user_id and name in local storage
      localStorage.setItem("activeUser", JSON.stringify({ user_id: newUser.user_id, name: newUser.username }));

      resetForm();
      setIsSignedUp(true);

      // Redirect to home page after a short delay
      setTimeout(() => {
        //props.loginUser(newUser.username);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error creating user:", error);
    }
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
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
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
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
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
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
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
            <p>Signed Up successfully. Redirecting to Home page...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { SignUp };
