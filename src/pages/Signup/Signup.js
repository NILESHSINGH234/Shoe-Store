import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Signup.css";

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const {
    state: { error },
    signupHandler,
  } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const { firstName, lastName, email, password } = formData;
  const errorMsg = error !== "" ? error.data.errors[0] : "";

  const submitSignupFormData = () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      signupHandler(firstName, lastName, email, password);
    
    }
  };

  return (
    <main class="main-wrapper">
      <section class="signup-section signup-container">
        <div class="card signup-card-container">
          <div class="card-title">Signup</div>
          {errorMsg !== "" ? (
            <div className="signup-error-message">{errorMsg}</div>
          ) : null}
          <div class="card-body">
            <form onSubmit={e => e.preventDefault()}>
              <div class="input-group">
                <label class="input-label">Email address</label>
                <input
                  type="email"
                  class="input-field"
                  required
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div class="input-group">
                <label class="input-label">First Name</label>
                <input
                  type="text"
                  class="input-field"
                  required
                  value={formData.firstName}
                  onChange={e =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div class="input-group">
                <label class="input-label">Last Name</label>
                <input
                  type="text"
                  class="input-field"
                  required
                  value={formData.lastName}
                  onChange={e =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div class="input-group">
                <label class="input-label">Password</label>
                <input
                  type="password"
                  class="input-field"
                  required
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div
                class={`input-group ${
                  !isPasswordMatched ? "input-show-error" : null
                } `}
              >
                <label class="input-label">Confirm Password</label>
                <input
                  type="password"
                  class="input-field"
                  required
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    setIsPasswordMatched(password === e.target.value);
                  }}
                />
                {!isPasswordMatched && (
                  <div class="error-message">Password doesn't match.</div>
                )}
              </div>
              <div class="card-extra-content">
                <div class="checkbox-group">
                  <label class="checkbox-label" for="checkbox1">
                    <input
                      class="checkbox"
                      id="checkbox1"
                      type="checkbox"
                      name="checkbox"
                    />
                    I accept all Terms & Conditions
                  </label>
                </div>
              </div>
              <button
                class="btn btn-primary signup-btn"
                onClick={submitSignupFormData}
              >
                Create New Account
              </button>
            </form>
            <div class="create-new-account-link">
              <Link to="/login">
                Already have an account
                <span class="material-icons">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};