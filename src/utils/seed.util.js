// src/utils/seed.util.js
import usersService from "../services/users.service.js";
import productsService from "../services/products.service.js";
import logger from "./winston.util.js";

// Datos iniciales de ejemplo
const initialUsers = [
  { name: "Alice", email: "alice@example.com", password: "alice1234", role: 0 },
  { name: "Bob", email: "bob@example.com", password: "bob1234", role: 0 },
  {
    name: "Charlie",
    email: "charlie@example.com",
    password: "charlie1234",
    role: 0,
  },
  { name: "Diana", email: "diana@example.com", password: "diana1234", role: 0 },
];

async function seedDatabase() {
  try {
    const users = await usersService.find().catch(() => []);
    const products = await productsService.find().catch(() => []);

    // Si no hay usuarios o hay menos de 4
    if (!users || users.length < 4) {
      logger.info("Seeding users...");
      // Crear usuarios si no existen
      for (const userData of initialUsers) {
        // Intentar crearlos. Si email ya existe, ignorar error.
        try {
          await usersService.create(userData);
        } catch (error) {
          // Posiblemente user ya existe, ignorar
        }
      }
      logger.info("Users seeded successfully.");
    }

    // Si no hay productos o hay menos de 40
    if (!products || products.length < 40) {
      logger.info("Seeding products...");
      const missingProductsCount = 40 - (products ? products.length : 0);
      for (let i = 0; i < missingProductsCount; i++) {
        // Crear productos genéricos
        await productsService.create({
          name: `Product ${i + 1}`,
          price: Math.floor(Math.random() * 100) + 1, // precio aleatorio
        });
      }
      logger.info("Products seeded successfully.");
    }
  } catch (error) {
    logger.error(`Error seeding data: ${error.message}`);
  }
}

export default seedDatabase;
