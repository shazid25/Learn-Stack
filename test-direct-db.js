const { PrismaClient } = require("@prisma/client");
// Remove -pooler from the URL
const directUrl = "postgresql://neondb_owner:npg_aG0csWq6ipEB@ep-shiny-bird-a8wyvaz8.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require";
const prisma = new PrismaClient({
  datasourceUrl: directUrl
});

async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
