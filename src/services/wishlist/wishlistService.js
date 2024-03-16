import axios from "axios";
import toast from "react-hot-toast";
export const getWishlistService = async (token, dispatch) => {
  
  try {
    const { data, status } = await axios.get("/api/user/wishlist", {
      headers: { authorization: token },
    });
    if (status === 200) {
      dispatch({ type: "LOAD_WISHLIST_FROM_SERVER", payload: data.wishlist });
    }
  } catch (error) {
    dispatch({ type: "WISHLIST_ERROR", payload: error.response });
  }
};

export const addToWishlistService = async (product, token, dispatch) => {
  const toastId = toast.loading("Adding item to wishlist...");
  try {
    const { data, status } = await axios.post(
      "/api/user/wishlist",
      { product },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      toast.success("Item added to wishlist.", {
        id: toastId,
      });
      dispatch({ type: "ADD_TO_WISHLIST", payload: data.wishlist });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: "WISHLIST_ERROR", payload: error.response });
  }
};

export const deleteFromWishlistService = async (productId, token, dispatch) => {
  const toastId = toast.loading("Deleting item from wishlist...");
  try {
    const { data, status } = await axios.delete(
      `/api/user/wishlist/${productId}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200) {
      toast.success("Item deleted from wishlist.", {
        id: toastId,
      });
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: data.wishlist });
    }
  } catch (error) {
    toast.error("Some error occured. Try Again.", {
      id: toastId,
    });
    dispatch({ type: "WISHLIST_ERROR", payload: error.response });
  }
};

export const toggleFavorite = (
  isAlreadyInWishlist,
  token,
  product,
  id,
  dispatch
) =>
  isAlreadyInWishlist
    ? deleteFromWishlistService(id, token, dispatch)
    : addToWishlistService(product, token, dispatch);