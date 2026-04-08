"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  BookOpen, 
  Clock, 
  GraduationCap, 
  TrendingUp, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  PlayCircle
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 4.0 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 5.2 },
  { name: "Fri", hours: 3.8 },
  { name: "Sat", hours: 6.0 },
  { name: "Sun", hours: 2.1 },
];

const activityData = [
  { 
    id: "1", 
    course: "React 19 Advanced Patterns", 
    date: "2 hours ago", 
    status: "Completed", 
    progress: "100%",
    type: "Lesson"
  },
  { 
    id: "2", 
    course: "Node.js Architecture", 
    date: "Yesterday", 
    status: "In Progress", 
    progress: "65%",
    type: "Quiz"
  },
  { 
    id: "3", 
    course: "Tailwind CSS v4 Deep Dive", 
    date: "2 days ago", 
    status: "In Progress", 
    progress: "20%",
    type: "Project"
  },
  { 
    id: "4", 
    course: "Agentic AI with Gemini", 
    date: "3 days ago", 
    status: "Enrolled", 
    progress: "0%",
    type: "Course"
  },
];

export function DashboardOverview({ enrolledCount }: { enrolledCount: number }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</CardTitle>
            <BookOpen className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{enrolledCount}</div>
            <p className="text-xs text-emerald-500 font-bold mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> +2 this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Hours Spent</CardTitle>
            <Clock className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">24.5h</div>
            <p className="text-xs text-blue-500 font-bold mt-1">Consistency 85%</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Certificates</CardTitle>
            <GraduationCap className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">3</div>
            <p className="text-xs text-slate-400 font-bold mt-1">Next goal: AWS Expert</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Current Streak</CardTitle>
            <Calendar className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">12 Days</div>
            <div className="flex gap-1 mt-2">
               {[1,2,3,4,5,6,7].map(d => (
                 <div key={d} className={`h-1.5 w-full rounded-full ${d < 6 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg shadow-slate-100/50 dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-black">Learning Momentum</CardTitle>
            <CardDescription>Daily study hours for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontWeight: 'bold'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#2563eb" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg shadow-slate-100/50 dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-black">Course Progress</CardTitle>
            <CardDescription>Completion percentage vs average</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                  />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar 
                    dataKey="hours" 
                    fill="#2563eb" 
                    radius={[6, 6, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Table Section */}
      <Card className="border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg shadow-slate-100/50 dark:shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black">Recent Activity</CardTitle>
            <CardDescription>Track your latest learning steps across all courses</CardDescription>
          </div>
          <Button variant="outline" className="rounded-xl font-bold">View History</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold">Topic / Course</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Completion</TableHead>
                <TableHead className="text-right font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityData.map((item) => (
                <TableRow key={item.id} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                        {item.type === "Lesson" ? <PlayCircle size={20} /> : <CheckCircle2 size={20} />}
                      </div>
                      <div>
                        <span className="font-bold block text-slate-900 dark:text-white">{item.course}</span>
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{item.type}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 font-medium">{item.date}</TableCell>
                  <TableCell>
                    <Badge className={
                      item.status === "Completed" 
                      ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20" 
                      : "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 border-blue-600/20"
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: item.progress }}></div>
                       </div>
                       <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{item.progress}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-slate-800">
                      <MoreVertical size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
