import { auth, Session } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LearningPathsSection from "./_components/sections/LearningPathsSection";
import { HeroSection } from "./_components/sections/HeroSection"; 
import { ClientVisualsWrapper } from "./_components/ClientVisualsWrapper";
import StatsSection from "./_components/sections/StatsSection";
import SpecialtiesSection from "./_components/sections/SpecialtiesSection";
import TestimonialsSection from "./_components/sections/TestimonialsSection";
import CTASection from "./_components/sections/CTASection";
import FeaturesSection from "./_components/sections/FeaturesSection";
import FAQSection from "./_components/sections/FAQSection";
import PartnersSection from "./_components/sections/PartnersSection";
import BlogHighlightsSection from "./_components/sections/BlogHighlightsSection";
import NewsletterSection from "./_components/sections/NewsletterSection";
import ChatAI from "./_components/ChatAI";

export const revalidate = 0;

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  }) as Session | null;

  // Server-side redirect for RBAC
  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  return (
    <ClientVisualsWrapper>
      <HeroSection />

      {/* 1. Features Section */}
      <FeaturesSection />

      {/* 2. Stats Section */}
      <StatsSection />
      
      {/* 3. Partners Section */}
      <PartnersSection />

      {/* 4. Specialties Section */}
      <SpecialtiesSection />

      {/* 5. Learning Paths Section */}
      <LearningPathsSection />
      
      {/* 6. Blog Highlights Section */}
      <BlogHighlightsSection />

      {/* 7. Testimonials Section */}
      <TestimonialsSection />
      
      {/* 8. FAQ Section */}
      <FAQSection />
      
      {/* 9. Newsletter Section */}
      <NewsletterSection />

      {/* 10. CTA Section */}
      <CTASection />

      <ChatAI />
    </ClientVisualsWrapper>
  );
}
