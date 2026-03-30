import { Clock, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPopularCourses } from "@/app/data/public/get-popular-courses";

interface CourseData {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  students: number;
  modules: number;
  price: string;
  slug: string;
}

export default async function LearningPathsSection() {
  const courses: CourseData[] = await getPopularCourses();
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Animated background elements (dark mode only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:block hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Popular Learning Paths</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore our most popular courses created by expert instructors.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 animate-slide-up">
            <p className="text-slate-600 dark:text-slate-400 mb-6">No courses available yet. Check back soon!</p>
            <Link href="/courses">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Browse All Courses
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="p-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-900/30 transition-all duration-300 flex flex-col group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{course.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 grow group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">{course.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Duration</p>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{course.duration}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Level</p>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{course.level}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Students</p>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{course.students}+</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Modules</p>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{course.modules} Lessons</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Lifetime Access</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{course.price}</p>
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        Explore
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 md:mt-16 animate-slide-up">
              <p className="text-slate-600 dark:text-slate-400 mb-6">Want to see more courses?</p>
              <Link href="/courses">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Browse All Courses
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
