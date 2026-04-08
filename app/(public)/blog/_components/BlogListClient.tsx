"use client";

import { useState } from "react";
import { CardReveal } from "@/components/animations/CardReveal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, User, Clock, Share2, Bookmark, Filter } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function BlogListClient({ initialBlogs }: { initialBlogs: any[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(initialBlogs.map(b => b.category)))];

  const filteredBlogs = initialBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Filter & Search Bar */}
      <section className="container mx-auto px-4 sticky top-20 z-20">
         <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xl flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1 relative w-full group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
               <Input 
                placeholder="Search articles by title or keyword..." 
                className="pl-12 py-7 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-medium focus-visible:ring-2 focus-visible:ring-blue-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
               <Filter className="text-slate-400 mr-2 shrink-0" size={20} />
               {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm border-2 ${
                      activeCategory === cat 
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
               ))}
            </div>
         </div>
      </section>

      {/* Grid of Posts */}
      <section className="container mx-auto px-4 pb-24">
         {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {filteredBlogs.map((blog, i) => (
                  <CardReveal key={blog.id} index={i} staggerDelay={0.1}>
                     <Link href={`/blog/${blog.slug}`} className="group h-full flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-2">
                        <div className="relative h-64 overflow-hidden">
                           <img 
                            src={blog.image || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80"} 
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                           <Badge className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 border-none font-bold backdrop-blur-sm shadow-lg">
                              {blog.category}
                           </Badge>
                        </div>
                        <div className="p-10 flex flex-col flex-1">
                           <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
                              <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
                              <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</span>
                           </div>
                           <h3 className="text-2xl font-black mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                              {blog.title}
                           </h3>
                           <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 line-clamp-3">
                              {blog.excerpt}
                           </p>
                           <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                              <div className="flex items-center gap-3">
                                 <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800">
                                    <AvatarFallback className="bg-blue-600/10 text-blue-600 font-bold text-xs">{blog.author[0]}</AvatarFallback>
                                 </Avatar>
                                 <span className="text-sm font-bold text-slate-900 dark:text-white">{blog.author}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Bookmark size={18} /></button>
                                 <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Share2 size={18} /></button>
                              </div>
                           </div>
                        </div>
                     </Link>
                  </CardReveal>
               ))}
            </div>
         ) : (
            <div className="text-center py-32 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
               <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Search className="text-slate-400" size={32} />
               </div>
               <h3 className="text-2xl font-black mb-2">No articles found</h3>
               <p className="text-slate-500 max-w-sm mx-auto mb-8">Try adjusting your search or category filters to find what you're looking for.</p>
               <Button 
                variant="outline" 
                className="rounded-2xl py-6 px-10 font-bold border-2" 
                onClick={() => {setSearch(""); setActiveCategory("All");}}
               >
                  Reset Filter
               </Button>
            </div>
         )}
      </section>
    </>
  );
}
