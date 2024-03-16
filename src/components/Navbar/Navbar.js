import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useWishlistAndCart } from '../../context/WishlistAndCartContext';
import { useState } from 'react';
export const Navbar = () => {
  const {
    state: { isLoggedIn },
    logoutHandler,
  } = useAuth();
  const {
    state: { wishlist, totalItemsInCart  },
  } = useWishlistAndCart();
  return (
    <nav className="navbar nav-ecommerce">
      <div className="navbar-section">
        
      <button className="nav-menu-btn hide-on-desktop">
          <span className="material-icons">menu</span>
        </button>
        <Link className="navbar-brand" to="/">
          nextstore
        </Link>
      </div>
      <div className="navbar-section">
        <form action="#" className="nav-form">
          <input
            type="search"
            placeholder="search"
            class="search-input"
            required
          />
          <button className="search-btn">
            <span className="material-icons">search</span>
          </button>
        </form>
      </div>
      <div className="navbar-section">
        <ul className="navbar-nav">
        <li className="nav-item hide-on-mobile">
            <Link to="/products" className="nav-link">
              Shop Now
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link badge badge-on-icon-sm">
              <i className="material-icons-outlined">favorite_border</i>
            
            
              {isLoggedIn && wishlist?.length > 0 ? (
                <span className="badge-number">{wishlist.length}</span>
              ) : null}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" class="nav-link badge badge-on-icon-sm">
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
  )
}
