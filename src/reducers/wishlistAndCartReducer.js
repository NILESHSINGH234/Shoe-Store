import { LOAD_CART_FROM_SERVER,LOAD_WISHLIST_FROM_SERVER,ADD_TO_CART,ADD_TO_WISHLIST,REMOVE_FROM_CARTR
,REMOVE_FROM_WISHLIST,REMOVE_FROM_CART,WISHLIST_ERROR,CART_ERROR } from ".";
  
  export const wishlistAndCartReducer = (state, { type, payload }) => {
    switch (type) {
      case LOAD_WISHLIST_FROM_SERVER:
        return { ...state, wishlist: payload };
      case ADD_TO_WISHLIST:
        return { ...state, wishlist: payload };
      case REMOVE_FROM_WISHLIST:
        return { ...state, wishlist: payload };
      case LOAD_CART_FROM_SERVER:
        return { ...state, cart: payload };
      case ADD_TO_CART:
        return { ...state, wishlist: payload };
      case REMOVE_FROM_CART:
        return { ...state, wishlist: payload };
      case WISHLIST_ERROR:
        return { ...state, wishlistError: payload };
      case CART_ERROR:
        return { ...state, cartError: payload };
      default:
        return state;
    }
  };