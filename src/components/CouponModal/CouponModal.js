import React from "react";
import { IoClose } from "react-icons/io5";
import "../../pages/Cart/Cart.css";
import { useWishlistAndCart } from "../../context/WishlistAndCartContext";

export const CouponModal = ({
  showCouponModal,
  setShowCouponModal,
  totalAmountAfterDiscount,
}) => {
  const {
    state: {
      applyCoupon: { code },
    },
    dispatch,
  } = useWishlistAndCart();

  return (
    <div className={showCouponModal ? "coupon-modal show" : "coupon-modal"}>
      <div className="coupon-section">
        <div className="coupon-header">
          <span>Coupons</span>
          <IoClose onClick={() => setShowCouponModal(false)} />
        </div>
        {totalAmountAfterDiscount < 2500 && (
          <div className="no-coupons">No coupons available</div>
        )}
        {totalAmountAfterDiscount > 2500 && totalAmountAfterDiscount < 4000 ? (
          <div className="coupon-container">
            <label htmlFor="coupon1" className="coupon-label">
              <input
                type="radio"
                name="coupon1"
                className="coupon-input"
                checked={code && code === "SUMMER100"}
                onChange={() => {
                  dispatch({
                    type: "APPLY_COUPON",
                    payload: {
                      code: "SUMMER100",
                      discount: 100,
                    },
                  });
                }}
              />
              Apply SUMMER100 for ₹100 OFF.
            </label>
          </div>
        ) : null}
        {totalAmountAfterDiscount > 4000 ? (
          <div className="coupon-container">
            <label htmlFor="coupon2" className="coupon-label">
              <input
                type="radio"
                name="coupon2"
                className="coupon-input"
                checked={code && code === "BIGBONUS500"}
                onChange={() => {
                  dispatch({
                    type: "APPLY_COUPON",
                    payload: {
                      code: "BIGBONUS500",
                      discount: 500,
                    },
                  });
                }}
              />
              Apply BIGBONUS500 for ₹500 OFF.
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
};