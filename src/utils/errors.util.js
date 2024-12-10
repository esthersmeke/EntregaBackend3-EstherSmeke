// src/utils/errors.util.js
const errors = {
  missingData: {
    message: "Required data is missing.",
    statusCode: 400,
  },
  userNotFound: {
    message: "User not found.",
    statusCode: 404,
  },
  productNotFound: {
    message: "Product not found.",
    statusCode: 404,
  },
  invalidQuantity: {
    message: "The 'quantity' parameter must be a valid number.",
    statusCode: 400,
  },
  unauthorized: {
    message: "Unauthorized. A valid token is required.",
    statusCode: 401,
  },
  forbidden: {
    message: "Access denied. Insufficient permissions.",
    statusCode: 403,
  },
  serverError: {
    message: "Internal server error.",
    statusCode: 500,
  },
  cartNotFound: {
    message: "Cart not found.",
    statusCode: 404,
  },
};

export default errors;
