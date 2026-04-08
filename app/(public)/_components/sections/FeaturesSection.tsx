"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CardReveal } from "@/components/animations/CardReveal";
import { AnimatedText } from "@/components/animations/AnimatedText";
// Fixed: Changed DesktopComputer to Monitor
import { BookOpen, Users, BarChart3, Monitor, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    title: "Comprehensive Courses",
    description: "Access curated content designed by industry-leading instructors.",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    title: "Global Community",
    description: "Connect with thousands of students and mentors worldwide.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Progress Analytics",
    description: "Track your learning journey with detailed data-driven insights.",
    icon: BarChart3,
    color: "bg-pink-500",
  },
  {
    title: "Interactive Platform",
    description: "Engage with hands-on projects, quizzes, and live coding.",
    icon: Monitor, // Fixed: Using Monitor here
    color: "bg-indigo-500",
  },
  {
    title: "Recognized Certificates",
    description: "Earn credentials that move your career forward in tech.",
    icon: ShieldCheck,
    color: "bg-emerald-500",
  },
  {
    title: "Ultra Fast Access",
    description: "Learn on the go with our lightning fast mobile-ready platform.",
    icon: Zap,
    color: "bg-orange-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              <AnimatedText variant="words">Designed for Excellence</AnimatedText>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              We provide all the tools you need to master your craft and reach your professional goals.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <CardReveal key={index} index={index} staggerDelay={0.1}>
              <Card className="h-full border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/10 border-b-4 hover:border-b-blue-600">
                <CardHeader className="pb-2">
                  <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  );
}