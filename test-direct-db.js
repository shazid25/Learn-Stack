const { PrismaClient } = require("@prisma/client");
// Remove -pooler from the URL
const directUrl = "postgresql://neondb_owner:npg_aG0csWq6ipEB@ep-shiny-bird-a8wyvaz8.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require";
const prisma = new PrismaClient({
  datasourceUrl: directUrl
});

async function main() {
  try {
    console.log("Connecting to direct database...");
    await prisma.$connect();
    console.log("Connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
