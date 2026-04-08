import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, TrendingUp, BookOpen, UserPlus, Settings } from "lucide-react";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ManagerDashboard() {
  const [userCount, blogCount, courseCount, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.blog.count(),
    prisma.course.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, createdAt: true, role: true }
    })
  ]);

  const stats = [
    { label: "Total Users", value: userCount, icon: Users, color: "text-blue-600" },
    { label: "Blog Posts", value: blogCount, icon: FileText, color: "text-purple-600" },
    { label: "Total Courses", value: courseCount, icon: BookOpen, color: "text-emerald-600" },
    { label: "Market Growth", value: "+12.5%", icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Manager Dashboard</h1>
        <p className="text-slate-500 font-medium">Welcome back! Here's what's happening on the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map(u => (
                 <div key={u.id} className="flex items-center gap-4">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                       <UserPlus className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                       <p className="text-sm font-bold">{u.name || "Anonymous"} <span className="text-xs font-normal text-slate-400">({u.role})</span></p>
                       <p className="text-xs text-slate-500">{u.email} - Joined {new Date(u.createdAt).toLocaleDateString()}</p>
                    </div>
                 </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <Link href="/manager/blogs/new" className="w-full">
                <Button className="w-full justify-start rounded-xl py-6 font-bold" variant="outline">
                   <FileText className="mr-2 h-4 w-4 text-blue-600" />
                   Publish New Blog Post
                </Button>
             </Link>
             <Link href="/manager/users" className="w-full">
                <Button className="w-full justify-start rounded-xl py-6 font-bold" variant="outline">
                   <Users className="mr-2 h-4 w-4 text-emerald-600" />
                   Manage User Roles
                </Button>
             </Link>
             <Link href="/manager/help" className="w-full">
                <Button className="w-full justify-start rounded-xl py-6 font-bold" variant="outline">
                   <BookOpen className="mr-2 h-4 w-4 text-purple-600" />
                   Update Help Center
                </Button>
             </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
