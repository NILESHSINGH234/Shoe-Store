import {
  LOAD_WISHLIST_FROM_SERVER,
  LOAD_CART_FROM_SERVER,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  TOTAL_ITEMS_IN_CART,
  WISHLIST_ERROR,
  CART_ERROR,
  APPLY_COUPON,
  RESET_CART,
  CLEAR_CART, // Add this import
} from "./actions";
  
  export const wishlistAndCartReducer = (state, { type, payload }) => {
    switch (type) {
      case LOAD_WISHLIST_FROM_SERVER:
        return { ...state, wishlist: payload };
      case ADD_TO_WISHLIST:
        return { ...state, wishlist: payload };
        case APPLY_COUPON:
          return { ...state, applyCoupon: payload };
      case REMOVE_FROM_WISHLIST:
        return { ...state, wishlist: payload };
      case LOAD_CART_FROM_SERVER:
        return { ...state, cart: payload };
      case ADD_TO_CART:
        return { ...state, cart: payload };
      case REMOVE_FROM_CART:
        return { ...state, cart: payload };
    case UPDATE_QUANTITY:
      return { ...state, cart: payload };
    case TOTAL_ITEMS_IN_CART:
      return { ...state, totalItemsInCart: payload };
      case WISHLIST_ERROR:
        return { ...state, wishlistError: payload };
      case CART_ERROR:
        return { ...state, cartError: payload };
        case RESET_CART:
          return {
            wishlist: [],
            cart: [],
            applyCoupon: {
              code: "",
              discount: 0,
            },
            totalItemsInCart: 0,
            wishlistError: "",
            cartError: "",
          };
          case CLEAR_CART:
            return {
              ...state,
              cart: [],
              totalItemsInCart: 0,
            };
      default:
        return state;
    }
  };