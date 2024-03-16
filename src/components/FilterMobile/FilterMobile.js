import React from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import "./FilterMobile.css";
export const FilterMobile = () => {
  return (
    <div className="filter-container-mobile">
      <div className="sort">
        <BiSortAlt2 /> <span>SORT</span>
      </div>
      <div className="filter">
        <FaFilter className="filter-icon" /> <span>FILTER</span>
      </div>
    </div>
  );
};