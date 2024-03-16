import { createContext, useContext, useReducer, useEffect } from "react";
import { wishlistAndCartReducer } from "../reducers";
import { getCartService, getWishlistService } from "../services";
import { useAuth } from "./AuthContext";
import { totalItemsInCart } from "../helpers";

const initialState = {
  wishlist: [],
  cart: [],
  totalPriceInMrp: 0,
  totalDiscount: 0,
  FinalAmountToPay: 0,
  totalItemsInCart: 0,
  wishlistError: "",
  cartError: "",
};

const WishlistAndCartContext = createContext(initialState);

const WishlistAndCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistAndCartReducer, initialState);
  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    token && getWishlistService(token, dispatch);
    token && getCartService(token, dispatch);
  }, [token]);
  useEffect(() => {
    let totalItems = totalItemsInCart(state.cart);
    dispatch({ type: "TOTAL_ITEMS_IN_CART", payload: totalItems });
  }, [state.cart]);
  return (
    <WishlistAndCartContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistAndCartContext.Provider>
  );
};

const useWishlistAndCart = () => useContext(WishlistAndCartContext);

export { WishlistAndCartProvider, useWishlistAndCart };