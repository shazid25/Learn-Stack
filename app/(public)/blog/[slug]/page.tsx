import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RnderDescription } from "@/components/rich-text-editor/RnderDescription";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      user: {
        select: { name: true, image: true }
      }
    }
  });

  if (!blog) {
    notFound();
  }

  // Calculate read time
  const wordCount = blog.content.length / 5;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="py-24">
      <article className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal direction="up">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-12 font-bold group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Link>
          
          <div className="space-y-8 mb-16">
            <Badge className="bg-blue-600 text-white border-none px-4 py-2 font-black uppercase tracking-widest text-xs">
              {blog.category}
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
              {blog.title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-blue-600 pl-6">
              {blog.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-lg">
                    <AvatarImage src={blog.user.image || ""} />
                    <AvatarFallback className="bg-blue-600/10 text-blue-600 font-bold">
                      {blog.user.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{blog.user.name}</span>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Author</span>
                  </div>
               </div>
               <div className="flex items-center gap-6 text-slate-400">
                  <span className="flex items-center gap-2 text-sm font-bold"><Calendar size={18} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-2 text-sm font-bold"><Clock size={18} /> {readTime} min read</span>
               </div>
               <button className="ml-auto p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Share2 size={20} />
               </button>
            </div>
          </div>

          <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl border-8 border-white dark:border-slate-900">
             <img 
              src={blog.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80"} 
              alt={blog.title}
              className="w-full h-full object-cover"
             />
          </div>

          <div className="max-w-3xl mx-auto">
             <RnderDescription json={JSON.parse(blog.content)} />
          </div>
          
          <div className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800">
             <div className="bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <h2 className="text-3xl font-black mb-6 relative z-10">Enjoyed this article?</h2>
                <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10 font-bold">
                   Subscribe to our newsletter to receive the latest industry insights and platform updates directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                   <Link href="/courses" className="px-10 py-5 bg-white text-blue-600 rounded-3xl font-black transform hover:-translate-y-1 transition-all shadow-xl">
                      Explore Courses
                   </Link>
                   <Link href="/contact" className="px-10 py-5 bg-blue-700 text-white border-2 border-white/20 rounded-3xl font-black transform hover:-translate-y-1 transition-all hover:bg-blue-800">
                      Contact Support
                   </Link>
                </div>
             </div>
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
}
