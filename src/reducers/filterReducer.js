import {
    LOAD_MAX_PRICE,
    FILTER_BY_CATEGORIES,
    FILTER_BY_BRANDS,
    FILTER_BY_PRICE,
    FILTER_BY_RATING,
    SORT_BY,
    FILTER_BY_SEARCH,
    FILTER_BY_CASH_ON_DELIVERY,
    FILTER_BY_FAST_DELIVERY,
    FILTER_BY_OUT_OF_STOCK,
    CLEAR_ALL_FILTERS,
  } from "./actions";
  
  import { getMaxPriceForFilter } from "../helpers";
  
  export const filterReducer = (state, { type, payload }) => {
    switch (type) {
      case LOAD_MAX_PRICE: {
        let max_price = getMaxPriceForFilter(payload);
        return {
          ...state,
          maxPrice: max_price,
          price: max_price,
        };
      }
      case FILTER_BY_CATEGORIES:
        return state.categories.includes(payload)
          ? {
              ...state,
              categories: state.categories.filter(
                category => category !== payload
              ),
            }
          : {
              ...state,
              categories: [...state.categories, payload],
            };
      case FILTER_BY_BRANDS:
        return state.brands.includes(payload)
          ? {
              ...state,
              brands: state.brands.filter(brand => brand !== payload),
            }
          : {
              ...state,
              brands: [...state.brands, payload],
            };
      case FILTER_BY_PRICE:
        return { ...state, price: payload };
      case FILTER_BY_RATING: {
        if (payload !== "") return { ...state, rating: payload };
        return { ...state, rating: 0 };
      }
      case SORT_BY: {
        if (payload === "PRICE_HIGH_TO_LOW")
          return { ...state, sortBy: "PRICE_HIGH_TO_LOW" };
        if (payload === "PRICE_LOW_TO_HIGH")
          return { ...state, sortBy: "PRICE_LOW_TO_HIGH" };
        return { ...state, sortBy: "" };
      }
      case FILTER_BY_CASH_ON_DELIVERY: {
        return { ...state, cashOnDelivery: payload };
      }
      case FILTER_BY_FAST_DELIVERY:
        return { ...state, fastDelivery: payload };
      case FILTER_BY_OUT_OF_STOCK: {
        return { ...state, includeOutOfStock: payload };
      }
      case FILTER_BY_SEARCH:
      return { ...state, search: payload };
      case CLEAR_ALL_FILTERS:
        return {
          ...state,
          search: "",
          sortBy: "",
          categories: [],
          brands: [],
          maxPrice: state.maxPrice,
          price: state.maxPrice,
          rating: 0,
          cashOnDelivery: false,
          fastDelivery: false,
          includeOutOfStock: true,
        };
      default:
        return state;
    }
  };