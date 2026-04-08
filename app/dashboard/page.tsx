import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { getAllCourses } from "../data/course/get-all-courses";
import { DashboardOverview } from "./_components/DashboardOverview";
import { CourseProgressCard } from "./_components/CourseProgressCard";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import EmptyState from "@/components/general/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, BookOpen, GraduationCap, Settings } from "lucide-react";

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  const availableCourses = courses.filter(
    (course) => !enrolledCourses.some(({ Course: enrolled }) => enrolled.id === course.id)
  );

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Student <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Track your progress, manage courses, and explore your growth.
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 w-full md:w-[400px] mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl h-auto">
          <TabsTrigger value="overview" className="rounded-xl py-3 font-bold flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-lg">
            <LayoutDashboard size={18} /> Overview
          </TabsTrigger>
          <TabsTrigger value="learning" className="rounded-xl py-3 font-bold flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-lg">
            <BookOpen size={18} /> Learning
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardOverview enrolledCount={enrolledCourses.length} />
        </TabsContent>

        <TabsContent value="learning" className="space-y-12">
          {/* Enrolled Courses */}
          <section>
            <div className="flex items-center gap-2 mb-6">
               <GraduationCap className="text-blue-600" size={24} />
               <h2 className="text-2xl font-black">My Active Courses</h2>
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

          {/* Recommended/Available Courses */}
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
               <h2 className="text-2xl font-black">Ready to Level Up?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {availableCourses.slice(0, 4).map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
