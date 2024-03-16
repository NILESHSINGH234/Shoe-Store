import axios from "axios";
import toast from "react-hot-toast";
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
    const toastId = toast.loading("Adding item to cart...");
    try {
      const { data, status } = await axios.post(
        "/api/user/cart",
        { product },
        {
          headers: { authorization: token },
        }
      );
      if (status === 200 || status === 201) {
        toast.success("Item added to cart.", {
          id: toastId,
        });
        dispatch({ type: "ADD_TO_CART", payload: data.cart });
      }} catch (error) {
        dispatch({ type: "CART_ERROR", payload: error.response });
      }
    };

    export const deleteFromCartService = async (productId, token, dispatch) => {
      const toastId = toast.loading("Deleting item from cart...");
        try {
          const { data, status } = await axios.delete(`/api/user/cart/${productId}`, {
            headers: { authorization: token },
          });
          if (status === 200) {
            toast.success("Item deleted from cart.", {
              id: toastId,
            });
            dispatch({ type: "REMOVE_FROM_CART", payload: data.cart });
          }
        } catch (error) {
          toast.error("Some error occured. Try Again.", {
            id: toastId,
          });
          dispatch({ type: "CART_ERROR", paylaod: error.response });
        }
      };
      
      export const clearCartService = async (token, dispatch) => {
        try {
          const { data, status } = await axios.post(
            "/api/user/cart/clearCart",
            {},
            { headers: { authorization: token } }
          );
          if (status === 201) {
            dispatch({ type: "RESET_CART", payload: data.cart });
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
        const toastId = toast.loading("Updating quantity...");
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
              toast.success("Quantity updated.", {
                id: toastId,
              });
              dispatch({ type: "UPDATE_QUANTITY", payload: data.cart });
            }
    
          } catch (error) {
            toast.error("Some error occured. Try Again.", {
              id: toastId,
            });
            dispatch({ type: "CART_ERROR", paylaod: error.response });
          }
        };