import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { useForm } from "../../fragments/customHook/useForm";
import userService from "../../services/userService";
import "../../style/signin.css";

function SignIn(props) {
  useScrollToTop(); // Custom hook to scroll to the top of the page on component mount

  const navigate = useNavigate(); // Hook to programmatically navigate to different routes
  const [isSignedIn, setIsSignedIn] = useState(null); // State to track sign-in status
  const [errorMessage, setErrorMessage] = useState(""); // State to track error message

  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  }); // Custom hook to manage form state and handle input changes

  const handleClick = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const verifiedUser = await userService.signInUser({
        email: values.email,
        password: values.password,
      });

      if (verifiedUser) {
        localStorage.setItem("activeUser", JSON.stringify({ user_id: verifiedUser.user_id, name: verifiedUser.username })); // Save active user to localStorage
        setIsSignedIn(true); // Set sign-in status to true
        setTimeout(() => {
          props.loginUser(verifiedUser.username); // Call loginUser prop function
          navigate("/"); // Navigate to home page
        }, 1000);
      } else {
        setIsSignedIn(false); // Set sign-in status to false if verification fails
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage(error.response?.data?.errors.map(err => err.msg).join(' ') || "Invalid email or password"); // Set the error message from the response
      setIsSignedIn(false); // Set sign-in status to false if verification fails
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="text-center mb-4 mt-5">
            <h2>Welcome back</h2>
          </div>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange} // Handle input change for email
              />
            </div>
            <div className="form-group">
              <input
                className="form-control my-3"
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange} // Handle input change for password
              />
            </div>
            <div className="text-center">
              <button className="btn mb-3 btn-login" onClick={handleClick}>
                Sign In
              </button>
            </div>
            {isSignedIn && (
              <div className="text-center">
                <p>Logging In</p> {/* Display logging in message */}
              </div>
            )}
            {isSignedIn === false && (
              <div className="text-center mt-3">
                <p>{errorMessage || "Invalid email or password"}</p> {/* Display invalid credentials message or error message */}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
