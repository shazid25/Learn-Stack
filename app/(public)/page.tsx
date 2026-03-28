import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import StatsSection from "./_components/sections/StatsSection";
import SpecialtiesSection from "./_components/sections/SpecialtiesSection";
import TestimonialsSection from "./_components/sections/TestimonialsSection";
import LearningPathsSection from "./_components/sections/LearningPathsSection";
import CTASection from "./_components/sections/CTASection";

import Link from "next/link";

interface featuresProps {
  title: string;
  description: string;
  icon: string;
}

const features: featuresProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carfully curated courses designed by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assessments to enhance your learning experience.",
    icon: "🎮",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achivements with detailed analytics and personalized dashboards.",
    icon: "📊",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate and share knowledge.",
    icon: "👥",
  },
];

export default async function Home() {
  const session = await auth.api.getSession({
    headers: {
      cookie: (await import("next/headers")).cookies().toString(),
    },
  });

  if (session?.user?.role === "admin") {
    redirect("/admin");
  }
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-linear-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-2000"></div>
        </div>

        <div className="container relative z-10 flex flex-col items-center text-center space-y-8 px-4 md:px-6 lg:px-8">
          <Badge variant="outline" className="animate-slide-down">🌟 The Future of Online Education</Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white animate-slide-up delay-100">
            Elevate your <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learning Experience</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed animate-slide-up delay-150">
            Discover a new way to learn with our modern, interactive management
            system. Access high-quality courses anytime, anywhere with expert instructors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-12 animate-slide-up delay-200">
            <Link
              href="/courses"
              className={buttonVariants({
                size: "lg",
              }) + " bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"}
            >
              Explore Courses
            </Link>

            <Link
              href="/login"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              }) + " hover:scale-105 transform transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:hover:bg-slate-800"}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl dark:hover:shadow-blue-900/30 transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-slate-800 group animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">{feature.icon}</div>
                  <CardTitle className="text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Stats Section */}
      <StatsSection />

      {/* Section 3: Specialties Section */}
      <SpecialtiesSection />

      {/* Section 4: Learning Paths Section */}
      <LearningPathsSection />

      {/* Section 5: Testimonials Section */}
      <TestimonialsSection />

      {/* Section 6: CTA Section */}
      <CTASection />
    </>
  );
}

