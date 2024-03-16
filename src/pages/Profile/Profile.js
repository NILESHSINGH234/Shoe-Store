import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";

export const Profile = () => {
  const {
    state: { userInfo, token, isLoggedIn },
  } = useAuth();

  return (
    <main className="main-wrapper">
      <section className="profile-section">
        {token && isLoggedIn ? (
          <>
            <div className="profile-card">
              <p className="profile-top-title">Your Profile</p>
              <div className="info-section">
                <p className="user-info">
                  First Name: <span>{userInfo?.user?.firstName}</span>
                </p>
                <p className="user-info">
                  Last Name: <span>{userInfo?.user?.lastName}</span>
                </p>
                <p className="user-info">
                  Email address: <span>{userInfo?.user?.email}</span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="user-message-container">
            <h3>You're logged out.</h3>
            <p>Log in to view your profile.</p>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};
