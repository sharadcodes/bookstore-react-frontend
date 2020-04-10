import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signup, isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    didRedirect: false,
  });

  const { name, email, password, error, didRedirect, success } = values;
  const { user } = isAuthenticated;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      }
      if (user && user.role === 0) {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: false,
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const successMessage = () => {
    return (
      <div style={{ display: success ? "" : "none" }} className="container">
        <p>
          New account was created successfully. <br />
          <Link to="/signin" className="teal-text">
            Login Here
          </Link>
        </p>
      </div>
    );
  };

  const errorMessage = () => {
    return <div style={{ display: error ? "" : "none" }}>{error}</div>;
  };

  const signUpForm = () => {
    return (
      <div className="container">
        <div className="row">
          <h4>Sign Up</h4>
          <div className="col m6 s12">
            <div className="input-field">
              <i className="material-icons prefix">person</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                onChange={handleChange("name")}
                defaultValue={name}
              />
              <label htmlFor="icon_prefix">Name</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">mail</i>
              <input
                id="icon_prefix"
                type="email"
                className="validate"
                onChange={handleChange("email")}
                defaultValue={email}
              />
              <label htmlFor="icon_prefix">Email</label>
            </div>
            <div className="input-field">
              <i className="material-icons prefix">lock</i>
              <input
                id="icon_lock"
                type="password"
                className="validate"
                onChange={handleChange("password")}
                defaultValue={password}
              />
              <label htmlFor="icon_lock">Password</label>
            </div>
            <button
              onClick={onSubmit}
              className="col m12 s12 btn btn-block blue darken-4 waves-effect"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base>
      {successMessage()}
      {errorMessage()}
      {performRedirect()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
