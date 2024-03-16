export const getFeaturedProducts = productsArray =>
  [...productsArray].filter(product => product.featured);

export const priceAfterDiscount = (priceInMrp, discountInPercentage) =>
  Math.trunc(priceInMrp - (priceInMrp * discountInPercentage) / 100);

export const getUniqueValues = (data, type) => {
  let unique = data.map(item => item[type]);
  return [...new Set(unique)];
};

export const putCommasInPrice = price =>
  new Intl.NumberFormat("en-IN").format(price);