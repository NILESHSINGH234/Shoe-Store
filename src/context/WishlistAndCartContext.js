import { createContext, useContext, useReducer, useEffect } from "react";
import { wishlistAndCartReducer } from "../reducers";
import { getCartService, getWishlistService } from "../services";
import { useAuth } from "./AuthContext";

const initialState = {
  wishlist: [],
  cart: [],
  totalPriceInMrp: 0,
  totalDiscount: 0,
  FinalAmountToPay: 0,
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

  return (
    <WishlistAndCartContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistAndCartContext.Provider>
  );
};

const useWishlistAndCart = () => useContext(WishlistAndCartContext);

export { WishlistAndCartProvider, useWishlistAndCart };