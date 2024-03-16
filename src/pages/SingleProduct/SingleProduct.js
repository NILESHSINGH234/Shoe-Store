import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import "./SingleProduct.css";
import { priceAfterDiscount, putCommasInPrice } from "../../helpers";
import { useWishlistAndCart } from "../../context/WishlistAndCartContext";
import {
  toggleFavorite,
  addToCartService,
  getSingleProductService,
} from "../../services";
import { useAuth } from "../../context/AuthContext";
export const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const {
    state: { token },
  } = useAuth();
  const {
    state: { wishlist, cart },
    dispatch,
  } = useWishlistAndCart();

  const _priceAfterDiscount = priceAfterDiscount(
    productInfo?.priceInMrp,
    productInfo?.discountInPercentage
  );
  const price_mrp = putCommasInPrice(productInfo?.priceInMrp);
  const price_after_discount = putCommasInPrice(_priceAfterDiscount);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const { data, status } = await getSingleProductService(productId);
        if (status === 200) {
          setProductInfo(data.product);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, [productId]);

  useEffect(() => {
    cart.find(cartProduct => cartProduct._id === productInfo._id) &&
      setInCart(true);
    wishlist.find(wishlistProduct => wishlistProduct._id === productInfo._id) &&
      setInWishlist(true);
  }, [cart, wishlist, productInfo]);

  return (
    <main className="main-wrapper">
      <div className="single-product-wrapper">
        {isLoading ? (
          <div className="loader">
            <TailSpin color="#2563eb" height={80} width={80} />
          </div>
        ) : (
          <div className="single-product-container">
            <div className="product-image-section">
              <div className="single-product-img">
                <img
                  src={productInfo.imageSrc}
                  alt={productInfo.title}
                  className=""
                />
              </div>
            </div>
            <div className="product-info-section">
              <h2 className="single-product-title">{productInfo.title}</h2>
              <span className="single-product brand-title">
                {productInfo.brand}
              </span>
              {productInfo.featured ? (
                <div className="featured-tag">Featured</div>
              ) : null}
              <span className="single-product rating">
                <BsStarFill className="star-icon" />
                <span>{productInfo.starRating}</span>
              </span>

              <div className="single-product card-price">
                <span className="single-product price-after-discount">
                  ₹{price_after_discount}
                </span>
                <span className=" single-product price-before-discount">
                  ₹{price_mrp}
                </span>
                <span className="single-product discount">
                  {productInfo.discountInPercentage}% OFF
                </span>
              </div>
              <div className="action-btns">
                {inCart ? (
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
                {inWishlist ? (
                  <Link
                    to="/wishlist"
                    className="btn btn-secondary-outline add-to-cart"
                  >
                    Added to Wishlist
                  </Link>
                ) : (
                  <button
                    className="btn btn-secondary-outline add-to-cart"
                    onClick={() =>
                      token
                        ? toggleFavorite(
                            inWishlist,
                            token,
                            productInfo,
                            productInfo._id,
                            dispatch
                          )
                        : navigate("/login")
                    }
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
