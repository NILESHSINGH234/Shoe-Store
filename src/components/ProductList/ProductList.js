import React from "react";
import "./ProductList.css";
import { BsStarFill } from "react-icons/bs";
import { useFilter } from "../../context/FilterContext";
import { useProduct } from "../../context/ProductContext";
import {
  getSortedProducts,
  getFilteredProducts,
  priceAfterDiscount,
  putCommasInPrice,
} from "../../helpers";
import { useWishlistAndCart } from "../../context/WishlistAndCartContext";
import { toggleFavorite } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const {
    state: { products },
  } = useProduct();
  const { state } = useFilter();
  const navigate = useNavigate();
  const {
    state: { token },
  } = useAuth();
  const {
    state: { wishlist },
    dispatch,
  } = useWishlistAndCart();
  const sortedProducts = getSortedProducts(products, state);
  const filteredProducts = getFilteredProducts(sortedProducts, state);

  return (
    <div className="products-grid-container">
      <div className="grid grid-col-2">
        {filteredProducts &&
          filteredProducts.map(product => {
            const {
              _id:id,
              title,
              brand,
              starRating,
              imageSrc,
              priceInMrp,
              discountInPercentage,
              inStock,
            } = product;
            const _priceAfterDiscount = priceAfterDiscount(
              priceInMrp,
              discountInPercentage
            );
            const price_mrp = putCommasInPrice(priceInMrp);
            const price_after_discount = putCommasInPrice(_priceAfterDiscount);
            const isAlreadyInWishlist = wishlist?.find(
              wishlistProduct => wishlistProduct._id === id
            );
            return (
              <div className="products-card" key={id}>
                <div className="card ecommerce-card card-with-badge">
                  <div className={inStock <= 0 ? "card-with-text-overlay" : ""}>
                    <div className="card-header">
                      <img src={imageSrc} alt={title} />
                    </div>
                    <button
                      className="card-floating-icon"
                      onClick={() =>
                        token
                          ? toggleFavorite(
                              isAlreadyInWishlist,
                              token,
                              product,
                              id,
                              dispatch
                            )
                          : navigate("/login")
                      }
                    >
                      {isAlreadyInWishlist ? (
                        <span className="material-icons-outlined icon-active">
                          favorite
                        </span>
                      ) : (
                        <span className="material-icons-outlined">
                          favorite_border
                        </span>
                      )}
                    </button>
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <div className="brand-star-container">
                        <span className="brand-title">{brand}</span>
                        <span className="rating">
                          <BsStarFill className="star-icon" />
                          <span>{starRating}</span>
                        </span>
                      </div>
                      <div className="card-price">
                        <span className="price-after-discount">
                          ₹{price_after_discount}
                        </span>
                        <span className="price-before-discount">
                          ₹{price_mrp}
                        </span>
                        <span className="discount">
                          {discountInPercentage}% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                  {inStock <= 0 ? (
                    <div className="text-overlay">Out of Stock</div>
                  ) : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};