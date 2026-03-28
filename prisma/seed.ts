import { prisma } from "@/lib/db";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.log("❌ ADMIN_EMAIL not set in .env");
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!user) {
      console.log(`❌ User with email ${adminEmail} not found`);
      console.log("📝 Please create the user first by signing up");
      return;
    }

    // Update role to admin
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: "admin" },
    });

    console.log(`✅ User ${adminEmail} set as admin`);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
