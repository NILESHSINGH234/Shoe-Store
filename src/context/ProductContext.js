import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { productReducer } from "../reducers";

const ProductContext = createContext(null);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    (async () => {
      try {
        const { data, status } = await axios.get("api/products");
        if (status === 200) {
          dispatch({ type: "LOAD_ALL_PRODUCTS", payload: data.products });
        }
      } catch (error) {
        dispatch({ type: "ERROR", payload: error });
      }
    })();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };