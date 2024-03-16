import React from "react";
import { BsStarFill } from "react-icons/bs";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { getProductById } from "../../helpers";
import "./SingleProduct.css";
import { priceAfterDiscount, putCommasInPrice } from "../../helpers";
import { useWishlistAndCart } from "../../context/WishlistAndCartContext";
import { toggleFavorite, addToCartService } from "../../services";
import { useAuth } from "../../context/AuthContext";
export const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    state: { products },
  } = useProduct();
  const {
    state: { token },
  } = useAuth();
  const {
    state: { wishlist, cart },
    dispatch,
  } = useWishlistAndCart();

  const productInfo = getProductById(products, productId);

  const {
    _id,
    title,
    brand,
    priceInMrp,
    discountInPercentage,
    starRating,
    imageSrc,
    featured,
  } = productInfo || {};

  const _priceAfterDiscount = priceAfterDiscount(
    priceInMrp,
    discountInPercentage
  );
  const price_mrp = putCommasInPrice(priceInMrp);
  const price_after_discount = putCommasInPrice(_priceAfterDiscount);
  const isAlreadyInCart = cart?.find(cartProduct => cartProduct._id === _id);
  const isAlreadyInWishlist = wishlist?.find(
    wishlistProduct => wishlistProduct._id === _id
  );

  return (
    <main className="main-wrapper">
      <div className="single-product-wrapper">
        <div className="single-product-container">
          <div className="product-image-section">
            <div className="single-product-img">
              <img src={imageSrc} alt={title} className="" />
            </div>
          </div>
          <div className="product-info-section">
            <h2 className="single-product-title">{title}</h2>
            <span className="single-product brand-title">{brand}</span>
            {featured ? <div className="featured-tag">Featured</div> : null}
            <span className="single-product rating">
              <BsStarFill className="star-icon" />
              <span>{starRating}</span>
            </span>

            <div className="single-product card-price">
              <span className="single-product price-after-discount">
                ₹{price_after_discount}
              </span>
              <span className=" single-product price-before-discount">
                ₹{price_mrp}
              </span>
              <span className="single-product discount">
                {discountInPercentage}% OFF
              </span>
            </div>
            <div className="action-btns">
              {isAlreadyInCart ? (
                <Link to="/cart" className="btn btn-primary add-to-cart">
                  Go to Cart
                </Link>
              ) : (
                <button
                  className="btn btn-primary add-to-cart"
                  onClick={() =>
                    token
                      ? addToCartService(productInfo, token, dispatch)
                      : navigate("/login")
                  }
                >
                  Add to Cart
                </button>
              )}

              <button
                className="btn btn-secondary-outline add-to-cart"
                onClick={() =>
                  token
                    ? toggleFavorite(
                        isAlreadyInWishlist,
                        token,
                        productInfo,
                        _id,
                        dispatch
                      )
                    : navigate("/login")
                }
              >
                {isAlreadyInWishlist
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};