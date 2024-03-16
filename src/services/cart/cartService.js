import axios from "axios";

export const getCartService = token => {
  return axios.get("/api/user/cart", {
    headers: { authorization: token },
  });
};

export const addToCartService = (product, token) => {
  return axios.post(
    "/api/user/cart",
    { product },
    {
      headers: { authorization: token },
    }
  );
};

export const deleteFromCartService = (productId, token) => {
  return axios.delete(`/api/user/cart/${productId}`, {
    headers: { authorization: token },
  });
};

export const updateQtyService = (productId, token, actionType) => {
  return axios.post(
    `/api/user/cart/${productId}`,
    {
      action: {
        type: `${actionType}`,
      },
    },
    {
      headers: { authorization: token },
    }
  );
};