import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signin, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.err) {
          setValues({ ...values, error: data.err, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => {
        console.log("Signin failed");
      });
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

  const loadingMessage = () => {
    return loading && <div className="container blue-text">Loading...</div>;
  };

  const errorMessage = () => {
    return (
      <div
        className="container red-text"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="container">
        <div className="row">
          <h4>Sign In</h4>
          <form className="col m6 s12">
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
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base>
      {signInForm()}
      {loadingMessage()}
      {errorMessage()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
