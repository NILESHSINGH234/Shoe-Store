import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import Mock from 'mockman-js';
import{ BrowserRouter} from 'react-router-dom'
import { ProductProvider } from "./context/ProductContext";
import { FilterProvider } from "./context/FilterContext";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ProductProvider>
      <FilterProvider>
      <App />
      </FilterProvider>
    
    </ProductProvider>
     
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
