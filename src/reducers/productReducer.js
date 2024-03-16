import { LOAD_ALL_PRODUCTS, LOADING, ERROR } from "./actions";

export const productReducer = (state, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: payload };
    case LOAD_ALL_PRODUCTS:
      return { ...state, loading: false, products: payload };
    default:
      return state;
  }
};