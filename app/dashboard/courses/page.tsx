import { getEnrolledCourses } from "../../data/user/get-enrolled-courses";
import { CourseProgressCard } from "../_components/CourseProgressCard";
import EmptyState from "@/components/general/EmptyState";
import { GraduationCap } from "lucide-react";

export default async function MyLearningPage() {
  const enrolledCourses = await getEnrolledCourses();

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          My <span className="text-blue-600">Learning</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
          Continue where you left off and track your progress.
        </p>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-6">
           <GraduationCap className="text-blue-600" size={24} />
           <h2 className="text-2xl font-black">Active Courses</h2>
        </div>
        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No courses purchased yet"
            description="You'll see your learning journey here once you enroll."
            buttonText="Browse All Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {enrolledCourses.map((course) => (
              <CourseProgressCard key={course.Course.id} data={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
