import React, { useState, useEffect } from "react";
import "./ExploreCategories.css";
import { getUniqueValues } from "../../helpers";
import { useProduct } from "../../context/ProductContext";

export const ExploreCategories = () => {
  const [categories, setCategories] = useState([]);
  const { state } = useProduct();
  const { products } = state;

  useEffect(() => {
    setCategories(getUniqueValues(products, "categoryName"));
  }, [products]);

  return (
    <section>
      <div className="container">
        <h2 className="text-left category-title font-weight-500">
          Explore Categories
        </h2>
        <div className="category-container">
          <div className="grid grid-col-2 gap-3">
            {categories &&
              categories.map((category, id) => {
                return (
                  <div className="category-card" key={id}>
                    <div className="card text-only-card">
                      <h5 className="card-title text-center font-weight-400">
                        {category}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};