"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CardReveal } from "@/components/animations/CardReveal";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";

const blogs = [
  {
    title: "Mastering React 19: New Hooks and Concurrent Rendering",
    excerpt: "Everything you need to know about the latest major release of React and how to upgrade your applications today.",
    author: "Jane Smith",
    date: "April 15, 2024",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    slug: "mastering-react-19"
  },
  {
    title: "The Rise of Agentic AI: Building Autonomous Coding Assistants",
    excerpt: "Exploring the shift from simple chatbots to complex AI agents capable of planning and executing software projects.",
    author: "Alex Rivera",
    date: "April 12, 2024",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    slug: "rise-of-agentic-ai"
  },
  {
    title: "Modern Styling with Tailwind CSS v4: What's New?",
    excerpt: "A deep dive into the next generation of utility-first CSS, featuring the new engine and zero-config setup.",
    author: "Marc Johnson",
    date: "April 10, 2024",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    slug: "modern-styling-tailwind-v4"
  }
];

export default function BlogHighlightsSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Latest Insights from Our Blog
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Stay updated with the latest trends in development, design, and AI.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={0.3}>
            <Link 
              href="/blog" 
              className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all pb-2 border-b-2 border-blue-600/20 hover:border-blue-600"
            >
              View All Posts <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <CardReveal key={index} index={index} staggerDelay={0.1}>
              <Link href={`/blog/${blog.slug}`} className="block group h-full">
                <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-800/40 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:bg-white dark:group-hover:bg-slate-800">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <User size={14} /> {blog.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} /> {blog.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 font-bold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Read More <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
