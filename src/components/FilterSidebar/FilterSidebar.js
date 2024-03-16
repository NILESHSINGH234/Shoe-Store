import React from "react";
import "./FilterSidebar.css";
import { useEffect, useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { useProduct } from "../../context/ProductContext";
import { getUniqueValues, putCommasInPrice } from "../../helpers";
import { FilterMobile } from "../FilterMobile/FilterMobile";

export const FilterSidebar = () => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const {
    state: { products },
  } = useProduct();
  const { state, dispatch } = useFilter();
  const {
    categories,
    brands,
    sortBy,
    minPrice,
    maxPrice,
    price,
    rating,
    cashOnDelivery,
    fastDelivery,
    includeOutOfStock,
  } = state;

  useEffect(() => {
    setUniqueCategories(getUniqueValues(products, "categoryName"));
    setUniqueBrands(getUniqueValues(products, "brand"));
  }, [products]);

  return (
    <React.Fragment>
      <FilterMobile
        products={products}
        uniqueCategories={uniqueCategories}
        uniqueBrands={uniqueBrands}
        filterState={state}
        dispatch={dispatch}
      />
      <aside className="sidebar-filter-container">
        <div className="sidebar-header">
          <span className="header-title">FILTERS</span>
          <span
            className="header-clear-btn"
            onClick={() => dispatch({ type: "CLEAR_ALL_FILTERS" })}
          >
            CLEAR ALL
          </span>
        </div>
        <hr className="divider" />
        <div className="filter-container">
          <span className="filter-title">Categories</span>
          <ul className="filter-list">
            {uniqueCategories &&
              uniqueCategories.map((category, id) => {
                return (
                  <li key={id}>
                    <label className="checkbox-label" htmlFor={category}>
                      <input
                        className="checkbox"
                        id={category}
                        type="checkbox"
                        name="checkbox"
                        checked={categories.includes(category)}
                        onChange={() =>
                          dispatch({
                            type: "FILTER_BY_CATEGORIES",
                            payload: category,
                          })
                        }
                      />
                      {category}
                    </label>
                  </li>
                );
              })}
          </ul>
        </div>
        <hr className="divider" />
        <div className="filter-container">
          <span className="filter-title">Brands</span>
          <ul className="filter-list">
            {uniqueBrands &&
              uniqueBrands.map((brand, id) => {
                return (
                  <li key={id}>
                    <label className="checkbox-label" htmlFor={brand}>
                      <input
                        className="checkbox"
                        id={brand}
                        type="checkbox"
                        name="checkbox"
                        checked={brands.includes(brand)}
                        onChange={() =>
                          dispatch({
                            type: "FILTER_BY_BRANDS",
                            payload: brand,
                          })
                        }
                      />
                      {brand}
                    </label>
                  </li>
                );
              })}
          </ul>
        </div>
        <hr className="divider" />
        <div className="filter-container">
          <span className="filter-title">Sort By</span>
          <ul className="filter-list">
            <li>
              <label className="radio-label">
                <input
                  className="radio-btn"
                  type="radio"
                  name="sortr"
                  checked={sortBy && sortBy === "RELEVANCE"}
                  onChange={() =>
                    dispatch({ type: "SORT_BY", payload: "RELEVANCE" })
                  }
                />
                Relevance
              </label>
            </li>
            <li>
              <label className="radio-label">
                <input
                  className="radio-btn"
                  type="radio"
                  name="sort"
                  checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
                  onChange={() =>
                    dispatch({ type: "SORT_BY", payload: "PRICE_HIGH_TO_LOW" })
                  }
                />
                Price - High to Low
              </label>
            </li>
            <li>
              <label className="radio-label">
                <input
                  className="radio-btn"
                  type="radio"
                  name="sort2"
                  checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
                  onChange={() =>
                    dispatch({ type: "SORT_BY", payload: "PRICE_LOW_TO_HIGH" })
                  }
                />
                Price - Low to High
              </label>
            </li>
          </ul>
        </div>
        <hr className="divider" />
        <div className="filter-container">
          <span className="filter-title">Price</span>
          <div className="filter-list">
            <label className="price-label">
              ₹{minPrice}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step="1000"
                value={price}
                onChange={e =>
                  dispatch({ type: "FILTER_BY_PRICE", payload: e.target.value })
                }
              />
              ₹{putCommasInPrice(price)}
            </label>
          </div>
        </div>
        <hr className="divider" />
        <div className="filter-container">
          <span className="filter-title">Rating</span>
          <ul className="filter-list">
            <li>
              <label className="checkbox-label" htmlFor="4-and-above">
                <input
                  className="checkbox"
                  id="4-and-above"
                  type="radio"
                  name="rating"
                  checked={rating && rating === 4}
                  onChange={() =>
                    dispatch({ type: "FILTER_BY_RATING", payload: 4 })
                  }
                />
                4.0 and above
              </label>
            </li>
            <li>
              <label className="checkbox-label" htmlFor="3-and-above">
                <input
                  className="checkbox"
                  id="3-and-above"
                  type="radio"
                  name="rating2"
                  checked={rating && rating === 3}
                  onChange={() =>
                    dispatch({ type: "FILTER_BY_RATING", payload: 3 })
                  }
                />
                3.0 and above
              </label>
            </li>
            <li>
              <label className="checkbox-label" htmlFor="2-and-above">
                <input
                  className="checkbox"
                  id="2-and-above"
                  type="radio"
                  name="rating3"
                  checked={rating && rating === 2}
                  onChange={() =>
                    dispatch({ type: "FILTER_BY_RATING", payload: 2 })
                  }
                />
                2.0 and above
              </label>
            </li>
            <li>
              <label className="checkbox-label" htmlFor="1-and-above">
                <input
                  className="checkbox"
                  id="1-and-above"
                  type="radio"
                  name="rating4"
                  checked={rating && rating === 1}
                  onChange={() =>
                    dispatch({ type: "FILTER_BY_RATING", payload: 1 })
                  }
                />
                1.0 and above
              </label>
            </li>
          </ul>
        </div>
        <hr className="divider" />
        <div className="filter-container">
          <span className="filter-title">Delivery</span>
          <ul className="filter-list">
            <li>
              <label className="checkbox-label" htmlFor="cash-on-delivery">
                <input
                  className="checkbox"
                  id="cash-on-delivery"
                  type="checkbox"
                  name="checkbox"
                  checked={cashOnDelivery && cashOnDelivery === true}
                  onChange={() =>
                    dispatch({
                      type: "FILTER_BY_CASH_ON_DELIVERY",
                      payload: !cashOnDelivery,
                    })
                  }
                />
                Cash On Delivery
              </label>
            </li>
            <li>
              <label className="checkbox-label" htmlFor="checkbox1">
                <input
                  className="checkbox"
                  id="checkbox1"
                  type="checkbox"
                  name="checkbox"
                  checked={fastDelivery && fastDelivery === true}
                  onChange={() =>
                    dispatch({
                      type: "FILTER_BY_FAST_DELIVERY",
                      payload: !fastDelivery,
                    })
                  }
                />
                Fast Delivery
              </label>
            </li>
          </ul>
        </div>
        <hr className="divider" />
        <div className="filter-container">
          <span className="filter-title">Availability</span>
          <ul className="filter-list">
            <li>
              <label className="checkbox-label" htmlFor="checkbox1">
                <input
                  className="checkbox"
                  id="checkbox1"
                  type="checkbox"
                  name="checkbox"
                  checked={includeOutOfStock && includeOutOfStock === true}
                  onChange={() =>
                    dispatch({
                      type: "FILTER_BY_OUT_OF_STOCK",
                      payload: !includeOutOfStock,
                    })
                  }
                />
                Include Out of Stock
              </label>
            </li>
          </ul>
        </div>
      </aside>
    </React.Fragment>
  );
};
