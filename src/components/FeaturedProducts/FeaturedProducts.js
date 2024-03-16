import React from "react";
import "./FeaturedProducts.css";
import { useProduct } from "../../context/ProductContext";
import {
  getFeaturedProducts,
  priceAfterDiscount,
  putCommasInPrice,
} from "../../helpers";
//import { addToCartService } from "../../services";
import { useNavigate,Link } from "react-router-dom";
import { toggleFavorite,addToCartService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { useWishlistAndCart } from "../../context/WishlistAndCartContext";

export const FeaturedProducts = () => {
  const { state } = useProduct();
  const { loading, products, error } = state;
  const navigate = useNavigate();
  const {
    state: { token },
  } = useAuth();
  const {
    state: { wishlist,cart },
    dispatch,
  } = useWishlistAndCart();
  const featuredProducts = getFeaturedProducts(products);

  return (
    <section className="card-container">
      <h2 className="text-left category-title font-weight-500">
        Featured Products
      </h2>
      <div className="featured-product-container">
        <div className="grid grid-col-2">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            featuredProducts &&
            featuredProducts.map(product => {
              const {
                _id: id,
                title,
                imageSrc,
                priceInMrp,
                discountInPercentage,
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
                <div className="featured-product-card" key={id}>
                  <div className="card ecommerce-card card-with-badge">
                  <Link to={`product/${id}`}>
                      <div className="card-header">
                        <img src={imageSrc} alt={title} />
                      </div>
                    </Link>
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
                    <Link to={`product/${id}`}>
                        <h5 className="card-title">{title}</h5>
                      </Link>
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
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};