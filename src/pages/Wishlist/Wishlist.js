import "./Wishlist.css";
import { useWishlistAndCart } from "../../context/WishlistAndCartContext";
import { priceAfterDiscount, putCommasInPrice } from "../../helpers";
import { BsStarFill } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { deleteFromWishlistService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { Link,useNavigate } from "react-router-dom";
import { addToCartService } from "../../services";

export const Wishlist = () => {

  const {
    state: { wishlist },
    dispatch,
  } = useWishlistAndCart();
  const {
    state: { token, isLoggedIn },
  } = useAuth();
  const navigate = useNavigate();
  return (
    <main>
      <section className="wishlist-section card-container">
        {token && isLoggedIn ? (
          <div className="wishlist-product-container">
            {wishlist && wishlist.length > 0 ? (
              <>
                <h2 className="category-title font-weight-500">
                  Your Wishlist
                  <span className="wishlist-count-badge">
                    <MdOutlineFavoriteBorder /> <p>{wishlist.length}</p>
                  </span>
                </h2>
                <div className="grid grid-col-2">
                  {wishlist.map(product => {
                    const {
                      _id: id,
                      title,
                      imageSrc,
                      priceInMrp,
                      discountInPercentage,
                      brand,
                      starRating,
                    } = product;
                    const _priceAfterDiscount = priceAfterDiscount(
                      priceInMrp,
                      discountInPercentage
                    );
                    const price_mrp = putCommasInPrice(priceInMrp);
                    const price_after_discount =
                      putCommasInPrice(_priceAfterDiscount);
                    return (
                      <div className="wishlist-product-card" key={id}>
                        <div className="card ecommerce-card card-with-badge">
                          <div className="card-header">
                            <img src={imageSrc} alt={title} />
                          </div>
                          <button
                            className="card-floating-icon"
                            onClick={() =>
                              deleteFromWishlistService(id, token, dispatch)
                            }
                          >
                            <span className="material-icons-outlined">
                              close
                            </span>
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
                            <button
                              className="btn btn-light btn-sm font-weight-500 move-to-bag"
                              onClick={() => {
                                addToCartService(product, token, dispatch);
                                deleteFromWishlistService(id, token, dispatch);
                                navigate("/cart");
                              }}
                            >
                              MOVE TO BAG
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="wishlist-message-container">
                <h2>Wishlist Empty.</h2>
                <p>
                  Add items that you would like to save for later to your
                  wishlist
                </p>
                <Link className="btn btn-primary-outline btn-sm" to="/products">
                Add Items To Wishlist
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="wishlist-message-container">
            <h3>You're logged out.</h3>
            <p>Log in to view your wishlist.</p>
            <Link className="btn btn-primary-outline btn-sm" to="/login">
              Login
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};