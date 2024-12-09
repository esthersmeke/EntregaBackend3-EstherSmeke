// src/utils/swagger.util.js
import __dirname from "../../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Backend3 API",
      description: "Backend3 API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: [
    `${__dirname}/src/docs/users.doc.yaml`,
    `${__dirname}/src/docs/products.doc.yaml`,
  ],
};

export default swaggerOptions;
