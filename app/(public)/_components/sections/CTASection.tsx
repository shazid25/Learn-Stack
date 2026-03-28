import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-purple-900 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6 animate-bounce-in">
            <Zap className="w-16 h-16 text-yellow-300 dark:text-yellow-400 drop-shadow-lg animate-pulse-glow" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
            Start Your Learning Journey Today
          </h2>

          <p className="text-lg text-blue-100 dark:text-blue-200 mb-8 leading-relaxed animate-slide-up delay-100">
            Join thousands of students already learning on LearnStack. Get access to world-class courses,
            expert instructors, and a supportive community. Start with a free course today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 animate-slide-up delay-150">
            <Link href="/courses">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-50 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Browse Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700 dark:hover:bg-purple-800 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {[
              { number: "500+", label: "Expert Courses", delay: "0" },
              { number: "10K+", label: "Active Students", delay: "100" },
              { number: "95%", label: "Success Rate", delay: "200" },
            ].map((stat, index) => (
              <div key={index} className="animate-bounce-in" style={{ animationDelay: `${stat.delay}ms` }}>
                <p className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{stat.number}</p>
                <p className="text-blue-100 dark:text-blue-300 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
