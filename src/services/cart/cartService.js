import axios from "axios";

export const getCartService = async (token, dispatch) => {
    try {
      const { data, status } = await axios.get("/api/user/cart", {
        headers: { authorization: token },
      });
      if (status === 200) {
        dispatch({ type: "LOAD_CART_FROM_SERVER", payload: data.cart });
      }
    } catch (error) {
      dispatch({ type: "CART_ERROR", payload: error.response });
    }
  };
  

  export const addToCartService = async (product, token, dispatch) => {
    try {
      const { data, status } = await axios.post(
        "/api/user/cart",
        { product },
        {
          headers: { authorization: token },
        }
      );
      if (status === 200 || status === 201) {
        dispatch({ type: "ADD_TO_CART", payload: data.cart });
      }} catch (error) {
        dispatch({ type: "CART_ERROR", payload: error.response });
      }
    };

    export const deleteFromCartService = async (productId, token, dispatch) => {
        try {
          const { data, status } = await axios.delete(`/api/user/cart/${productId}`, {
            headers: { authorization: token },
          });
          if (status === 200) {
            dispatch({ type: "REMOVE_FROM_CART", payload: data.cart });
          }
        } catch (error) {
          dispatch({ type: "CART_ERROR", paylaod: error.response });
        }
      };
      

      export const updateQtyService = async (
        productId,
        token,
        actionType,
        dispatch
      ) => {
        try {
          const { data, status } = await axios.post(
            `/api/user/cart/${productId}`,
            {
              action: {
                type: `${actionType}`,
              },
            }, {
                headers: { authorization: token },
              }
            );
            if (status === 200 || status === 201) {
              dispatch({ type: "UPDATE_QUANTITY", payload: data.cart });
            }
    
          } catch (error) {
            dispatch({ type: "CART_ERROR", paylaod: error.response });
          }
        };