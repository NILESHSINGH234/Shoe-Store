import axios from "axios";

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
  try {
    const { data, status } = await axios.post(
      "/api/user/wishlist",
      { product },
      {
        headers: { authorization: token },
      }
    );
    if (status === 200 || status === 201) {
      dispatch({ type: "ADD_TO_WISHLIST", payload: data.wishlist });
    }
  } catch (error) {
    dispatch({ type: "WISHLIST_ERROR", payload: error.response });
  }
};

export const deleteFromWishlistService = async (productId, token, dispatch) => {
  try {
    const { data, status } = await axios.delete(
      `/api/user/wishlist/${productId}`,
      {
        headers: { authorization: token },
      }
    );
    if (status === 200) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: data.wishlist });
    }
  } catch (error) {
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