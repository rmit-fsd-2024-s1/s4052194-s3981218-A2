import React, { useCallback, useState } from "react";
import { verifySignIn } from "../../services/verify";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import "../../style/signin.css";
function SignIn(props) {
  useScrollToTop();

  //state for signIn
  const [isSignedIn, setIsSignedIn] = useState(null);

  //State to store values email and password
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //academic reference of Week 2 and Week 3
  const handleClick = (event) => {
    event.preventDefault();

    const verifiedUser = verifySignIn(values.email, values.password);

    if (verifiedUser) {
      localStorage.setItem("activeUser", JSON.stringify(verifiedUser));
      setIsSignedIn(true);
      setTimeout(() => {
        props.loginUser(verifiedUser.name);
        navigate("/");
      });
    } else {
      setIsSignedIn(false);
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
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control my-3"
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button className="btn mb-3 btn-login" onClick={handleClick}>
                SignIn
              </button>
            </div>
            {isSignedIn && (
              <div className="text-center">
                <p>Logging In</p>
              </div>
            )}
            {isSignedIn === false && (
              <div className="text-center mt-3">
                <p>Invalid email or password</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
