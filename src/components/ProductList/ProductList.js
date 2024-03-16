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
  getSearchedProducts,
} from "../../helpers";
import { useWishlistAndCart } from "../../context/WishlistAndCartContext";
import { addToCartService, toggleFavorite } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
    state: { wishlist, cart },
    dispatch,
  } = useWishlistAndCart();

  const searchedProduct = getSearchedProducts(products, state);
  const sortedProducts = getSortedProducts(searchedProduct, state);
  const filteredProducts = getFilteredProducts(sortedProducts, state);

  return (
    <div className="products-grid-container">
      {filteredProducts.length === 0 ? (
        <div className="product-not-found">
          <h3>No Product Found.</h3>
        </div>
      ) : (
        <div className="grid grid-col-2">
          {filteredProducts &&
            filteredProducts.map(product => {
              const {
                _id: id,
                id: uid,
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
              const price_after_discount =
                putCommasInPrice(_priceAfterDiscount);
              const isAlreadyInWishlist = wishlist?.find(
                wishlistProduct => wishlistProduct._id === id
              );
              const isAlreadyInCart = cart?.find(
                cartProduct => cartProduct._id === id
              );

              return (
                <div className="products-card" key={id}>
                  <div className="card ecommerce-card card-with-badge">
                    <div
                      className={inStock <= 0 ? "card-with-text-overlay" : ""}
                    >
                      <div
                        className="card-header"
                        onClick={() => navigate(`/product/${uid}`)}
                      >
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
                        <Link to={`/product/${uid}`}>
                          <h5 className="card-title">{title}</h5>
                        </Link>
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
                        {isAlreadyInCart ? (
                          <Link
                            to="/cart"
                            className="btn btn-primary add-to-cart"
                          >
                            Go to Cart
                          </Link>
                        ) : (
                          <button
                            className="btn btn-primary add-to-cart"
                            onClick={() =>
                              token
                                ? addToCartService(product, token, dispatch)
                                : navigate("/login")
                            }
                          >
                            Add to Cart
                          </button>
                        )}
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
      )}
    </div>
  );
};
