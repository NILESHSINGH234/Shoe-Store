import "./Cart.css";
import { useWishlistAndCart } from "../../context/WishlistAndCartContext";
import {
  priceAfterDiscount,
  putCommasInPrice,
  getTotalMrpInCart,
  getTotalAmount,
  getTotalDiscountOnMrp,
  getFinalAmountToPay,
} from "../../helpers";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  addToWishlistService,
  deleteFromCartService,
  updateQtyService,
} from "../../services";

export const Cart = () => {
  const {
    state: { cart, totalItemsInCart },
    dispatch,
  } = useWishlistAndCart();
  const {
    state: { token, isLoggedIn },
  } = useAuth();

  const totalMrpInCart = getTotalMrpInCart(cart);
  const totalAmountAfterDiscount = getTotalAmount(cart);
  const totalDiscount = getTotalDiscountOnMrp(
    totalMrpInCart,
    totalAmountAfterDiscount
  );
  const finalAmountToPay = getFinalAmountToPay(totalAmountAfterDiscount);
  return (
    <main className="main-wrapper">
      <section className="cart-section cart-container">
        {token && isLoggedIn ? (
          <div>
            {cart && cart.length > 0 ? (
              <>
                <h2 className="category-title font-weight-500">Your Cart</h2>
                <div className="cart-grid-container">
                  <div className="grid grid-col-1">
                    <div className="cart-grid-items">
                      {cart &&
                        cart.map(product => {
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
                          return (
                            <div className="card cart-horizontal-card" key={id}>
                              <div className="card-body">
                                <img
                                  className="img-responsive"
                                  src={imageSrc}
                                  alt={title}
                                />
                                <div className="card-description">
                                  <p className="card-title">{title}</p>
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
                                  <div className="quantity-container">
                                    <span>Quantity:</span>
                                    <div className="quantity-counter">
                                      <button
                                        onClick={() =>
                                          updateQtyService(
                                            id,
                                            token,
                                            "decrement",
                                            dispatch
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <span>{product.qty}</span>
                                      <button
                                        onClick={() =>
                                          updateQtyService(
                                            id,
                                            token,
                                            "increment",
                                            dispatch
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                <button
                                  className="btn btn-light btn-sm  remove-from-cart"
                                  onClick={() =>
                                    deleteFromCartService(id, token, dispatch)
                                  }
                                >
                                  Remove
                                </button>
                                <button
                                  className="btn btn-light btn-sm  save-for-later"
                                  onClick={() => {
                                    deleteFromCartService(id, token, dispatch);
                                    addToWishlistService(
                                      product,
                                      token,
                                      dispatch
                                    );
                                  }}
                                >
                                  Save for later
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    
                    </div>
                    <div className="cart-grid-items">
                      <div className="cart-summary">
                        <div className="card">
                          <div className="card-header">
                            <p className="card-title">
                              Price Details ({totalItemsInCart}
                              {totalItemsInCart > 1 ? " items" : " item"})
                            </p>
                          </div>
                          <hr className="divider" />
                          <div className="card-body">
                            <div className="card-item">
                              <p className="card-text">Total MRP</p>
                              <p className="total-mrp">
                                ₹{putCommasInPrice(totalMrpInCart)}
                              </p>
                            </div>
                            <div className="card-item">
                              <p className="card-text">Discount on MRP</p>
                              <p className="discount-on-mrp">
                                -₹{putCommasInPrice(totalDiscount)}
                              </p>
                            </div>
                            <div className="card-item">
                              <p className="card-text">Delivery Charges</p>
                              <p className="delivery-charge">
                                {totalAmountAfterDiscount < 2000
                                  ? "₹50"
                                  : "FREE"}
                              </p>
                            </div>
                            <div className="card-item">
                              <p className="card-text">Coupon Discount</p>
                              <button className="apply-coupon">
                                Apply Coupon
                              </button>
                            </div>
                          </div>
                          <hr className="divider" />
                          <div className="card-footer">
                            <div className="card-item">
                              <p className="card-text">Total Amount</p>
                              <p className="total-amount">
                                ₹{putCommasInPrice(finalAmountToPay)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="checkout-btn">
                        <button className="btn btn-primary">PLACE ORDER</button>
                      </div>
                    </div>
                  </div>
                </div>
                </>
            ) : (
              <div className="cart-message-container">
                <h3>Hey, it feels so light!</h3>
                <p>There is nothing in your bag. Let's add some items.</p>
                <Link className="btn btn-primary-outline" to="/wishlist">
                  Add Items From Wishlist
                </Link>
              </div>
               )}
               </div>
             ) : (
               <div className="cart-message-container">
                 <h3>You're logged out.</h3>
                 <p>Log in to view your cart.</p>
                 <Link className="btn btn-primary-outline btn" to="/login">
                   Login
                 </Link>
               </div>  )}
      </section>
    </main>
  );
};