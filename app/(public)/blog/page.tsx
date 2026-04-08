import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { BlogListClient } from "./_components/BlogListClient";

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    include: {
      user: {
        select: { name: true, image: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  // Calculate read time roughly (1 min per 200 words)
  const blogsWithMeta = blogs.map(blog => {
    const wordCount = blog.content.length / 5; // Simplified
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    return {
      ...blog,
      readTime: `${readTime} min read`,
      author: blog.user.name || "Anonymous",
      date: new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    };
  });

  return (
    <div className="py-24 space-y-24">
      
      {/* Blog Header */}
      <section className="container mx-auto px-4 max-w-4xl text-center">
        <ScrollReveal direction="up">
          <Badge variant="outline" className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-4 py-2 font-bold uppercase tracking-widest text-xs">
            Learn-Stack Blog
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mt-6 leading-tight">
            Insights for the <span className="text-blue-600">modern</span> developer.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mt-8 max-w-3xl mx-auto">
            Deep dives, tutorials, and industry analysis from our team of experts and guest contributors.
          </p>
        </ScrollReveal>
      </section>

      {/* Featured Post (Latest) */}
      {blogsWithMeta.length > 0 && (
        <section className="container mx-auto px-4">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="relative group overflow-hidden rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl lg:h-[500px]">
               <div className="absolute inset-0 flex flex-col lg:flex-row h-full">
                  <div className="w-full lg:w-3/5 h-full relative overflow-hidden">
                     <img 
                      src={blogsWithMeta[0].image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"} 
                      alt="Featured post" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-linear-to-r from-slate-900 lg:from-transparent to-transparent opacity-60 lg:opacity-0 transition-opacity"></div>
                  </div>
                  <div className="w-full lg:w-2/5 p-12 flex flex-col justify-center bg-white dark:bg-slate-900 relative z-10">
                     <Badge className="bg-blue-600 text-white border-none w-fit mb-6 px-3 py-1 font-bold uppercase tracking-widest text-[10px]">
                        Featured Post
                     </Badge>
                     <h2 className="text-3xl font-black mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                        {blogsWithMeta[0].title}
                     </h2>
                     <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed line-clamp-3">
                        {blogsWithMeta[0].excerpt}
                     </p>
                     <div className="flex items-center gap-4 text-sm font-bold text-slate-400 mb-8">
                        <span className="flex items-center gap-1"><User size={16} /> {blogsWithMeta[0].author}</span>
                        <span className="flex items-center gap-1"><Clock size={16} /> {blogsWithMeta[0].readTime}</span>
                     </div>
                     <Link 
                      href={`/blog/${blogsWithMeta[0].slug}`} 
                      className="flex items-center gap-2 text-blue-600 font-black hover:gap-4 transition-all"
                     >
                       Read Full Article <ArrowRight size={20} />
                     </Link>
                  </div>
               </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Interactive Blog List Component */}
      <BlogListClient initialBlogs={blogsWithMeta} />

    </div>
  );
}
