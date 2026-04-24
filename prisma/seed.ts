import { prisma } from "@/lib/db";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!user) {
      // User with email not found
    } else {
      // Update role to admin
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: "admin" },
      });
    }

    // Seed FAQs
    const faqCount = await prisma.fAQ.count();
    if (faqCount === 0) {
      await prisma.fAQ.createMany({
        data: [
          {
            question: "What is Learn-Stack?",
            answer: "Learn-Stack is a modern learning management system designed to help developers master full-stack development through project-based learning.",
            category: "General",
            position: 1,
          },
          {
            question: "Are the courses suitable for beginners?",
            answer: "Yes, we have courses ranging from beginner to advanced levels. Each course page clearly states the recommended skill level.",
            category: "Courses",
            position: 2,
          },
          {
            question: "How do I get my certificate?",
            answer: "Once you complete all lessons and projects in a course, your certificate will be automatically generated in your dashboard.",
            category: "Certification",
            position: 3,
          },
        ],
      });
    }

    // Seed Help Categories and Articles
    const helpCategoryCount = await prisma.helpCategory.count();
    if (helpCategoryCount === 0) {
      const category = await prisma.helpCategory.create({
        data: {
          title: "Getting Started",
          description: "Everything you need to know to start your learning journey.",
          icon: "Zap",
          position: 1,
          articles: {
            create: [
              {
                title: "How to enroll in a course",
                content: "1. Browse our catalog\n2. Select a course\n3. Click 'Enroll Now'\n4. Complete the checkout if it's a paid course.",
                position: 1,
              },
              {
                title: "Managing your profile",
                content: "You can update your name, email, and avatar in the profile settings within your dashboard.",
                position: 2,
              },
            ],
          },
        },
      });
    }
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
