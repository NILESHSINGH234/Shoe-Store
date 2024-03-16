import React from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiShoppingBag } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { BiHomeCircle } from "react-icons/bi";

export const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const {
    state: { isLoggedIn },
    logoutHandler,
  } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={showSidebar ? "sidebar-bg visible" : "sidebar-bg"}>
      <div className={showSidebar ? "sidebar reveal" : "sidebar"}>
        <ul className="sidebar-links">
          <li>
            <Link to="/" className="link-item" onClick={toggleSidebar}>
              <BiHomeCircle className="icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/products" className="link-item" onClick={toggleSidebar}>
              <FiShoppingBag className="icon" />
              <span>Shop now</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="link-item" onClick={toggleSidebar}>
              <BsPerson className="icon" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
        {isLoggedIn && (
          <button
            onClick={logoutHandler}
            className="btn btn-primary btn-sm sidebar-btn"
          >
            Logout
          </button>
        )}
        {!isLoggedIn && (
          <button
            onClick={() => {
              navigate("/login");
              toggleSidebar();
            }}
            className="btn btn-primary btn-sm login-sidebar-btn"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};