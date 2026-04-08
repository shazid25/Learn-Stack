import { getIndividualCourse } from "@/app/data/course/get-course";
import { checkIfCourseBought } from "@/app/data/user/user-is-enrolled";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { RnderDescription } from "@/components/rich-text-editor/RnderDescription";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { 
  IconBook, 
  IconCategory, 
  IconChartBar, 
  IconChevronDown, 
  IconClock, 
  IconPlayerPlay,
  IconStar,
  IconFileCertificate,
  IconDevices,
  IconInfinity,
  IconUsers
} from "@tabler/icons-react";
import { CheckIcon, ArrowRight, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EnrollmentButton } from "./_components/EnrollmentButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PublicCourseCard } from "../../_components/PublicCourseCard";

type Params = Promise<{ slug: string }>;

export default async function SlugPage({ params }: { params: Params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { slug } = await params;
  const course = await getIndividualCourse(slug);

  if (!course || course.status !== "Published") {
    return notFound();
  }

  const isEnrolled = await checkIfCourseBought(course.id);
  const allCourses = await getAllCourses();
  const relatedCourses = allCourses
    .filter(c => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  return (
    <div className="pb-24 animate-in fade-in duration-1000">
      
      {/* Course Header Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES as string}.t3.storageapi.dev/${course.fileKey}`}
          alt={course.title}
          fill
          className="object-cover opacity-30 blur-xl scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/60 to-slate-50 dark:to-slate-950 transition-colors"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 space-y-6">
           <ScrollReveal direction="up">
              <div className="flex flex-wrap gap-3 mb-4">
                 <Badge className="bg-blue-600 text-white border-none py-1.5 px-4 font-bold uppercase tracking-widest text-[10px]">
                    {course.category}
                 </Badge>
                 <Badge variant="outline" className="text-white border-white/20 py-1.5 px-4 font-bold uppercase tracking-widest text-[10px] backdrop-blur-md">
                    {course.level}
                 </Badge>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl">
                 {course.title}
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                 {course.smallDescription}
              </p>
              <div className="flex items-center gap-6 text-slate-300 font-bold">
                 <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                       {[1,2,3,4].map(i => <Star key={i} size={18} fill="currentColor" />)}
                       <Star size={18} />
                    </div>
                    <span>4.8 (1.2k Ratings)</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <IconUsers size={20} className="text-blue-500" />
                    <span>2,450 Students Enrolled</span>
                 </div>
              </div>
           </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Video Preview Card */}
            <ScrollReveal direction="up" delay={0.2}>
               <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-800 bg-slate-900 group cursor-pointer">
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES as string}.t3.storageapi.dev/${course.fileKey}`}
                    alt="Course Preview"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/20 transition-all">
                     <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 transform group-hover:scale-110 transition-transform">
                        <Play fill="white" size={32} className="ml-1 text-white" />
                     </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white font-black text-sm uppercase tracking-widest bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl">
                     Preview this course
                  </div>
               </div>
            </ScrollReveal>

            {/* What you'll learn */}
            <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
               <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  What you'll learn
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Master the fundamental concepts and advanced patterns.",
                    "Build 5+ real-world production level projects.",
                    "Optimize applications for maximum performance.",
                    "Implement industry-standard security protocols.",
                    "Leverage AI tools for faster development workflow.",
                    "Gain lifetime access to private community support."
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                       <CheckIcon className="text-blue-600 shrink-0 mt-1" size={20} />
                       <span className="text-slate-600 dark:text-slate-400 font-medium">{item}</span>
                    </div>
                  ))}
               </div>
            </section>

            {/* Description */}
            <div className="space-y-8 prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                <IconFileCertificate className="text-blue-600" size={32} />
                Course Details
              </h2>
              <div className="bg-slate-50/50 dark:bg-slate-800/30 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 leading-relaxed">
                <RnderDescription json={JSON.parse(course.description)} />
              </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tight">Curriculum</h2>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  {course.chapter.length} Chapters • {course.chapter.reduce((t, c) => t + c.lessons.length, 0)} Lessons
                </div>
              </div>

              <div className="space-y-4">
                {course.chapter.map((chapter, index) => (
                  <Collapsible key={chapter.id} defaultOpen={index === 0}>
                    <Card className="rounded-3xl border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <CollapsibleTrigger asChild>
                        <button className="w-full h-full text-left">
                          <CardContent className="p-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <div className="size-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-black">
                                  {index + 1}
                                </div>
                                <div className="space-y-1">
                                  <h3 className="text-xl font-bold">{chapter.title}</h3>
                                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                    {chapter.lessons.length} LESSONS • MODULE {index + 1}
                                  </span>
                                </div>
                              </div>
                              <IconChevronDown className="size-6 text-slate-400" />
                            </div>
                          </CardContent>
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 p-6 space-y-3">
                          {chapter.lessons.map((lesson, li) => (
                            <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800 group">
                              <div className="size-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                <IconPlayerPlay size={18} />
                              </div>
                              <div className="flex-1">
                                 <p className="font-bold text-slate-900 dark:text-white">{lesson.title}</p>
                                 <span className="text-[10px] font-black text-slate-400 uppercase">Video • 12:45 min</span>
                              </div>
                              <ArrowRight size={18} className="text-slate-200 group-hover:text-blue-600 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <section className="pt-16 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-3xl font-black mb-10">Frequently Bought Together</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {relatedCourses.map(rc => (
                     <PublicCourseCard key={rc.id} data={rc} />
                   ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="rounded-[3rem] overflow-hidden border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/10">
                <CardHeader className="bg-slate-900 p-8 text-white">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-black uppercase tracking-widest text-slate-400">Total Price</span>
                      <Badge className="bg-blue-600 text-white border-none">Limited Offer</Badge>
                   </div>
                   <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black">
                        ${course.price}
                      </span>
                      <span className="text-slate-500 line-through font-bold text-xl">$149.99</span>
                   </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8 bg-white dark:bg-slate-900">
                  
                  <div className="space-y-4">
                    {[
                      { icon: IconClock, label: "Duration", val: `${course.duration} Hours` },
                      { icon: IconChartBar, label: "Level", val: course.level },
                      { icon: IconBook, label: "Lessons", val: `${course.chapter.reduce((t, c) => t + c.lessons.length, 0)} Total` },
                      { icon: IconInfinity, label: "Access", val: "Lifetime" },
                      { icon: IconDevices, label: "Format", val: "All Devices" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                         <div className="flex items-center gap-3">
                            <item.icon className="text-blue-600" size={18} />
                            <span className="text-sm font-bold text-slate-500">{item.label}</span>
                         </div>
                         <span className="text-sm font-black text-slate-900 dark:text-white">{item.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {session ? (
                      isEnrolled ? (
                        <Link
                          className={buttonVariants({ 
                            className: "w-full py-8 text-lg font-black rounded-2xl shadow-xl shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700" 
                          })}
                          href="/dashboard"
                        >
                          Already Enrolled - View in Dashboard
                        </Link>
                      ) : (
                        <EnrollmentButton courseId={course.id} />
                      )
                    ) : (
                      <Link
                        className={buttonVariants({ 
                          className: "w-full py-8 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20" 
                        })}
                        href="/login"
                      >
                        Login to Purchase
                      </Link>
                    )}
                    <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest">
                       30-Day Money-Back Guarantee
                    </p>
                  </div>

                  <Separator className="border-slate-100 dark:border-slate-800" />
                  
                  <div className="space-y-4">
                     <h4 className="font-bold flex items-center gap-2">
                        <IconStar className="text-blue-600" size={16} />
                        Share this course
                     </h4>
                     <div className="flex gap-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:scale-105 transition-transform cursor-pointer"></div>
                        ))}
                     </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
