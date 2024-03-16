import React from "react";
import { useState } from "react";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    state: { error },
    loginHandler,
  } = useAuth();

  const errorMsg = error !== "" && error.data.errors[0];

  console.log(errorMsg);

  const submitLoginFormData = () => {
    loginHandler(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <main className="main-wrapper">
      <section className="login-section login-container">
        <div className="card login-card-container">
          <div className="card-title">Login</div>
          {errorMsg ? (
            <div className="login-error-message">{errorMsg}</div>
          ) : null}
          <div className="card-body">
            <form onSubmit={e => e.preventDefault()}>
              <div className="input-group">
                <label className="input-label">Email address</label>
                <input
                  type="email"
                  className="input-field"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="card-extra-content">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      className="checkbox"
                      id="checkbox1"
                      type="checkbox"
                      name="checkbox"
                    />
                    Remember me
                  </label>
                </div>
                <div className="forgot-password">Forgot your password?</div>
              </div>
              <button
                className="btn btn-primary login-btn"
                onClick={submitLoginFormData}
              >
                Login
              </button>
            </form>
            <div className="create-new-account-link">
              <Link to="/signup">
                Create New Account
                <span className="material-icons">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};