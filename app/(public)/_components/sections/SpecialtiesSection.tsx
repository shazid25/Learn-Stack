import { Code2, Briefcase, Zap, Users2, BookOpen, Target } from "lucide-react";

interface SpecialtyProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const specialties: SpecialtyProps[] = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Web Development",
    description: "Master HTML, CSS, JavaScript, React, and modern web frameworks from beginner to advanced.",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Business Skills",
    description: "Develop professional competencies in leadership, project management, and entrepreneurship.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Data Science",
    description: "Learn Python, machine learning, data analysis, and AI techniques with real-world projects.",
  },
  {
    icon: <Users2 className="w-8 h-8" />,
    title: "Digital Marketing",
    description: "Explore SEO, content marketing, social media strategies, and performance analytics.",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Creative Design",
    description: "Create stunning visuals with UI/UX design, graphic design, and motion graphics.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Cloud & DevOps",
    description: "Master AWS, Docker, Kubernetes, and modern deployment practices.",
  },
];

export default function SpecialtiesSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background elements (dark mode only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:block hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Our Specialties</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore diverse learning paths covering in-demand skills and trending technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl dark:hover:shadow-blue-900/30 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300">
                {specialty.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{specialty.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">{specialty.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
