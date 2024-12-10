import env from "./env.util.js";

// Definimos un objeto "dummy" que reemplace la funcionalidad de faker en producción.
// Este objeto tiene las mismas propiedades que usamos en el código, pero con valores por defecto.
let fakerLib = {
  commerce: {
    productName: () => "Faker disabled in production",
    price: () => "0.00",
  },
  person: {
    firstName: () => "Faker disabled in production",
  },
  internet: {
    email: () => "no-email@example.com",
    password: () => "password",
  },
  image: {
    avatar: () => "https://example.com/avatar.png",
  },
};

// Si no estamos en modo prod, importamos dinámicamente el faker real.
if (env.MODE !== "prod") {
  const { faker } = await import("@faker-js/faker");
  fakerLib = faker;
}

// Exportamos fakerLib como faker. En producción, será el objeto dummy.
// En dev/test, será el faker real.
export { fakerLib as faker };
