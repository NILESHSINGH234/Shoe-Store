import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { IoClose } from "react-icons/io5";
import {  useLocation, useNavigate } from "react-router-dom";
import { useWishlistAndCart } from '../../context/WishlistAndCartContext';
import { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { useFilter } from "../../context/FilterContext";

export const Navbar = () => {
  const {
    state: { isLoggedIn },
    logoutHandler,
  } = useAuth();
  const {
    state: { wishlist, totalItemsInCart  },
  } = useWishlistAndCart();
  const navigate = useNavigate();

  const { dispatch } = useFilter();

  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  const searchBtnHandler = () => {
    if (pathname === "/products") {
      dispatch({ type: "FILTER_BY_SEARCH", payload: searchQuery });
    } else {
      dispatch({ type: "FILTER_BY_SEARCH", payload: searchQuery });
      navigate("/products");
    }
  };
  return (
    <div className="">
    <nav className="navbar nav-ecommerce">
      <div className="navbar-section">
        <button
          className="nav-menu-btn hide-on-desktop"
          onClick={toggleSidebar}
        >
          {showSidebar ? (
            <span className="material-icons">close</span>
          ) : (
            <span className="material-icons">menu</span>
          )}
        </button>
        <Link className="navbar-brand" to="/">
          nextstore
        </Link>
      </div>
      <div className="navbar-section">
        
        {pathname === "/login" || pathname === "/signup" ? null : (
          <form className="nav-form" onSubmit={e => e.preventDefault()}>
            <input
              type="search"
              placeholder="search"
              className="search-input"
              value={searchQuery || ""}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="search-btn" onClick={searchBtnHandler}>
              <span className="material-icons">search</span>
            </button>
          </form>
        )}
      </div>
      <div className="navbar-section">
        <ul className="navbar-nav">
          <li className="nav-item hide-on-mobile">
            <Link to="/products" className="nav-link">
              Shop Now
            </Link>
          </li>
          
          {pathname === "/login" || pathname === "/signup" ? null : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="nav-link search-icon-mobile"
                  onClick={toggleSearchModal}
                >
                  <span className="material-icons-outlined">search</span>
                </button>
              </li>
            </ul>
          )}

          <li className="nav-item">
            <Link to="/wishlist" className="nav-link badge badge-on-icon-sm">
              <i className="material-icons-outlined">favorite_border</i>
              {isLoggedIn && wishlist?.length > 0 ? (
                <span className="badge-number">{wishlist.length}</span>
              ) : null}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link badge badge-on-icon-sm">
              <i className="material-icons-outlined">shopping_bag</i>
              {isLoggedIn && totalItemsInCart > 0 ? (
                <span className="badge-number">{totalItemsInCart}</span>
              ) : null}
            </Link>
          </li>
          <li className="nav-item hide-on-mobile">
            <Link className="nav-link" to="/profile">
              <i className="material-icons-outlined">person</i>
            </Link>
          </li>
        </ul>
        {isLoggedIn && (
          <button
            onClick={logoutHandler}
            className="btn btn-secondary btn-sm ml-1 hide-on-mobile"
          >
            Logout
          </button>
        )}
        {!isLoggedIn && (
          <Link
            to="/login"
            className="btn btn-secondary btn-sm ml-1 hide-on-mobile"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
    <div
      className={showSearchModal ? "search-modal-bg" : "search-modal-bg hide"}
    >
      <div
        className={
          showSearchModal
            ? "search-slide-modal search-modal search-slide-modal-show"
            : "search-modal search-slide-modal"
        }
      >
        <div className="search-modal-top">
          <p className="search-modal-title">
            Search videos related to coding.
          </p>
          <IoClose onClick={toggleSearchModal} />
        </div>
        <div className="">
          <form
            className="search-mobile nav-form"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="search"
              placeholder="search..."
              className="search-input"
              value={searchQuery || ""}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button
              className="search-btn"
              onClick={() => {
                searchBtnHandler();
                toggleSearchModal();
              }}
            >
              <span className="material-icons">search</span>
            </button>
          </form>
        </div>
      </div>
    </div>
    <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
  </div>
  )
}
