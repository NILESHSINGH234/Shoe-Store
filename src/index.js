import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import Mock from 'mockman-js';
import{ BrowserRouter} from 'react-router-dom'
import { ProductProvider } from "./context/ProductContext";
import { FilterProvider } from "./context/FilterContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistAndCartProvider } from "./context/WishlistAndCartContext";
import ScrollToTop from "./pages/scrollToTop";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <ProductProvider>
      <FilterProvider>
        <WishlistAndCartProvider>
          <ScrollToTop></ScrollToTop>
        <App />
        </WishlistAndCartProvider>
     
      </FilterProvider>
    
    </ProductProvider>
    </AuthProvider>
     
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
