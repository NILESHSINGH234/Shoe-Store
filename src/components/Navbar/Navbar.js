import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <nav class="navbar nav-ecommerce">
      <div class="navbar-section">
      <button class="nav-menu-btn hide-on-desktop">
          <span class="material-icons">menu</span>
        </button>
        <Link class="navbar-brand" to="/">
          nextstore
        </Link>
      </div>
      <div class="navbar-section">
        <form action="#" class="nav-form">
          <input
            type="search"
            placeholder="search"
            class="search-input"
            required
          />
          <button class="search-btn">
            <span class="material-icons">search</span>
          </button>
        </form>
      </div>
      <div class="navbar-section">
        <ul class="navbar-nav">
        <li class="nav-item hide-on-mobile">
            <Link to="/products" class="nav-link">
              Shop Now
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/wishlist" class="nav-link badge badge-on-icon-sm">
              <i class="material-icons-outlined">favorite_border</i>
              <span class="badge-number">5</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/cart" class="nav-link badge badge-on-icon-sm">
              <i class="material-icons-outlined">shopping_bag</i>
              <span class="badge-number">2</span>
            </Link>
          </li>
          <li class="nav-item hide-on-mobile">
            <Link class="nav-link" to="/profile">
              <i class="material-icons-outlined">person</i>
            </Link>
          </li>
        </ul>
        <Link to="/login" class="btn btn-secondary btn-sm ml-1 hide-on-mobile">
          Login
        </Link>
      </div>
    </nav>
  )
}
