import axios from "axios";

export const getSingleProductService = productId => {
  return axios.get(`/api/products/${productId}`);
};
