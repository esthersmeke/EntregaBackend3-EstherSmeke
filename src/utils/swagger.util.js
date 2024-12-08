import __dirname from "../../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Backend3 API",
      description: "Documentación de la API de Backend3",
    },
  },
  apis: [
    `${__dirname}/src/docs/users.doc.yaml`,
    `${__dirname}/src/docs/products.doc.yaml`,
  ],
};

export default swaggerOptions;
