import "./Cart.css";

export const Cart = () => {

  return (
    <main class="main-wrapper">
      <section class="cart-section cart-container">
        <h2 class="category-title font-weight-500">Your Cart</h2>
        <div class="cart-grid-container">
          <div class="grid grid-col-1">
            <div class="cart-grid-items">
              <div class="card cart-horizontal-card">
                <div class="card-body">
                  <img
                    class="img-responsive"
                    src="https://5.imimg.com/data5/TestImages/QC/VB/CC/SELLER-74949445/bulk-fitness-waterproof-m3-smart-band-0-87-oled-sports-smart-bracelet-500x500.jpg"
                    alt=""
                  />
                  <div class="card-description">
                    <p class="card-title">Watch X15 Air</p>
                    <div class="card-price">
                      <span class="price-after-discount">₹2,499</span>
                      <span class="price-before-discount">₹6,990</span>
                      <span class="discount">64% OFF</span>
                    </div>
                    <div class="select-quantity">
                      <label for="quantity">Quantity:</label>
                      <select name="quantity" id="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <button class="btn btn-light btn-sm  remove-from-cart">
                    Remove
                  </button>
                  <button class="btn btn-light btn-sm  save-for-later">
                    Save for later
                  </button>
                </div>
              </div>
            </div>
            <div class="cart-grid-items">
              <div class="cart-summary">
                <div class="card">
                  <div class="card-header">
                    <p class="card-title">Price Details (1 item)</p>
                  </div>
                  <hr class="divider" />
                  <div class="card-body">
                    <div class="card-item">
                      <p class="card-text">Total MRP</p>
                      <p class="total-mrp">₹3,999</p>
                    </div>
                    <div class="card-item">
                      <p class="card-text">Discount on MRP</p>
                      <p class="discount-on-mrp">-₹2800</p>
                    </div>
                    <div class="card-item">
                      <p class="card-text">Delivery Charges</p>
                      <p class="delivery-charge">FREE</p>
                    </div>
                    <div class="card-item">
                      <p class="card-text">Coupon Discount</p>
                      <button class="apply-coupon">Apply Coupon</button>
                    </div>
                  </div>
                  <hr class="divider" />
                  <div class="card-footer">
                    <div class="card-item">
                      <p class="card-text">Total Amount</p>
                      <p class="total-amount">₹1,199</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="checkout-btn">
                <button class="btn btn-primary">PLACE ORDER</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};