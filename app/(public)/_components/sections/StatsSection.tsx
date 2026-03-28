import { BarChart3, Users, Award, TrendingUp } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  description: string;
}

const stats: StatProps[] = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    number: "10,000+",
    label: "Active Students",
    description: "Learners worldwide mastering new skills",
  },
  {
    icon: <Award className="w-8 h-8" />,
    number: "500+",
    label: "Expert Courses",
    description: "Comprehensive curriculum from industry leaders",
  },
  {
    icon: <Users className="w-8 h-8" />,
    number: "150+",
    label: "Instructors",
    description: "Experienced professionals in their fields",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    number: "95%",
    label: "Success Rate",
    description: "Students completing courses successfully",
  },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-20 lg:py-28 bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-40 h-40 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-purple-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-slide-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-slate-900 dark:text-white">
            Our Impact
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
            Join thousands of learners who are transforming their careers and achieving their goals through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 md:p-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl dark:hover:shadow-blue-900/30 transition-all duration-300 text-center group hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 animate-bounce-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {stat.number}
              </h3>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2 text-sm md:text-base">{stat.label}</p>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
