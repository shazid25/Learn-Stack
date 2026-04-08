"use client";

import { getAllCourses, PublicCourseType } from "@/app/data/course/get-all-courses";
import { PublicCourseCard, PublicCourseCardSkeleton } from "../_components/PublicCourseCard";
import { Suspense, useState, useEffect, useMemo } from "react";
import { Search, Filter, SortAsc, SortDesc, SlidersHorizontal, BookOpen, Clock, DollarSign, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function PublicCoursesRoute() {
  const [courses, setCourses] = useState<PublicCourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // NOTE: In a real app, this might be a server action or API call with params
      // but for this demo, we'll fetch all and filter in client for speed.
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                            course.category.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || course.category === category;
        const matchesLevel = level === "All" || course.level === level;
        return matchesSearch && matchesCategory && matchesLevel;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "duration") return b.duration - a.duration;
        return 0; // default stays same (newest)
      });
  }, [courses, search, category, level, sortBy]);

  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <Badge variant="outline" className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-3 py-1 font-bold">
                Knowledge Library
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mt-2">
                Explore <span className="text-blue-600">Courses</span>
              </h1>
              <p className="max-w-2xl text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Discover world-class video courses and interactive projects designed to transform your professional life.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal direction="up" delay={0.2}>
             <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
               <div className="flex flex-col px-4 border-r border-slate-100 dark:border-slate-800 pointer-events-none">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Courses</span>
                 <span className="text-sm font-bold text-slate-900 dark:text-white">{filteredCourses.length} Total</span>
               </div>
               <div className="flex flex-col px-4 pointer-events-none">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Average Rating</span>
                 <span className="text-sm font-bold text-slate-900 dark:text-white">4.9 ★</span>
               </div>
             </div>
          </ScrollReveal>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            
            {/* Search Bar */}
            <div className="relative w-full lg:flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <Input
                placeholder="Search by title, technology, or category..."
                className="pl-12 py-7 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-lg focus-visible:ring-2 focus-visible:ring-blue-600 transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Quick Desktop Filters */}
            <div className="hidden xl:flex items-center gap-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] py-7 rounded-2xl border-slate-200 dark:border-slate-700 font-bold">
                  <BookOpen className="mr-2 text-blue-500" size={18} />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800">
                  {categories.map(c => <SelectItem key={c} value={c} className="rounded-xl font-bold">{c}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-[180px] py-7 rounded-2xl border-slate-200 dark:border-slate-700 font-bold">
                   <SlidersHorizontal className="mr-2 text-blue-500" size={18} />
                   <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800">
                  {levels.map(l => <SelectItem key={l} value={l} className="rounded-xl font-bold">{l}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] py-7 rounded-2xl border-slate-200 dark:border-slate-700 font-bold">
                   <SortAsc className="mr-2 text-blue-500" size={18} />
                   <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-800">
                  <SelectItem value="newest" className="font-bold rounded-xl">Newest First</SelectItem>
                  <SelectItem value="price-low" className="font-bold rounded-xl">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="font-bold rounded-xl">Price: High to Low</SelectItem>
                  <SelectItem value="duration" className="font-bold rounded-xl">Longest Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filter Toggle */}
            <Button 
              variant={showFilters ? "secondary" : "outline"} 
              className="xl:hidden w-full py-7 rounded-2xl font-bold border-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2" size={18} /> {showFilters ? "Hide Filters" : "Advanced Filters"}
            </Button>
          </div>

          {/* Expanded Mobile Filters */}
          {showFilters && (
            <div className="xl:hidden grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 animate-in slide-in-from-top-2 duration-300">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="py-6 rounded-xl font-bold border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                  {categories.map(c => <SelectItem key={c} value={c} className="font-bold">{c}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="py-6 rounded-xl font-bold border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                  {levels.map(l => <SelectItem key={l} value={l} className="font-bold">{l}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="py-6 rounded-xl font-bold border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                  <SelectItem value="newest" className="font-bold">Newest First</SelectItem>
                  <SelectItem value="price-low" className="font-bold">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="font-bold">Price: High to Low</SelectItem>
                  <SelectItem value="duration" className="font-bold">Longest Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* active filter badges */}
          {(category !== "All" || level !== "All" || search !== "") && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black text-slate-400 uppercase mr-2 self-center">Active Filters:</span>
              {search && (
                <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 px-3 py-1 rounded-full font-bold group cursor-pointer" onClick={() => setSearch("")}>
                  Query: {search} <X size={14} className="ml-2" />
                </Badge>
              )}
              {category !== "All" && (
                <Badge className="bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20 px-3 py-1 rounded-full font-bold group cursor-pointer" onClick={() => setCategory("All")}>
                  {category} <X size={14} className="ml-2" />
                </Badge>
              )}
              {level !== "All" && (
                <Badge className="bg-purple-600/10 text-purple-600 dark:text-purple-400 hover:bg-purple-600/20 px-3 py-1 rounded-full font-bold group cursor-pointer" onClick={() => setLevel("All")}>
                  {level} <X size={14} className="ml-2" />
                </Badge>
              )}
              <Button variant="ghost" size="sm" className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase p-0 h-auto underline" onClick={() => {setCategory("All"); setLevel("All"); setSearch("");}}>Clear All</Button>
            </div>
          )}
        </div>

        {/* Results Grid - 4 columns on desktop as requested */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <PublicCourseCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            {filteredCourses.map((course) => (
              <PublicCourseCard key={course.id} data={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl shadow-slate-100/50 dark:shadow-none">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Courses Found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
              We couldn't find any courses matching your current filters. Try adjusting your search or category.
            </p>
            <Button 
              variant="outline" 
              className="py-6 px-10 rounded-2xl font-bold border-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-bold"
              onClick={() => {setCategory("All"); setLevel("All"); setSearch("");}}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
