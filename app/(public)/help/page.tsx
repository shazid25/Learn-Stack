"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Book, PlayCircle, CreditCard, User, Shield, HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const categories = [
  { icon: User, title: "Account & Profile", count: 12, desc: "Managing your account settings and profile details." },
  { icon: PlayCircle, title: "Course Access", count: 8, desc: "Troubleshooting video playback and course materials." },
  { icon: CreditCard, title: "Billing & Payments", count: 15, desc: "Understanding invoices, refunds, and subscriptions." },
  { icon: Shield, title: "Security & Privacy", count: 6, desc: "Keeping your account and data safe on Learn-Stack." },
  { icon: Book, title: "Certificates", count: 5, desc: "How to earn and share your professional credentials." },
  { icon: HelpCircle, title: "General Info", count: 20, desc: "Basics about our platform and how we operate." },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="py-24 space-y-24">
      
      {/* Search Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <ScrollReveal direction="up">
          <Badge variant="outline" className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-4 py-2 font-bold uppercase tracking-widest text-xs mb-8">
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
             How can we <span className="text-blue-600">help</span> you today?
          </h1>
          <div className="max-w-2xl mx-auto mt-12 relative group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={24} />
             <Input 
              placeholder="Search for articles, guides, or tutorials..." 
              className="pl-16 py-8 rounded-[2rem] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-2xl text-lg font-medium focus-visible:ring-blue-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </ScrollReveal>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {categories.map((cat, i) => (
             <ScrollReveal key={i} direction="up" delay={i * 0.1}>
               <div className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col cursor-pointer">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 text-blue-600 rounded-2xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110 mb-6">
                     <cat.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{cat.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium mb-6">{cat.desc}</p>
                  <div className="mt-auto flex items-center justify-between">
                     <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{cat.count} Articles</span>
                     <ArrowRight size={20} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2" />
                  </div>
               </div>
             </ScrollReveal>
           ))}
        </div>
      </section>

      {/* Popular Articles */}
      <section className="container mx-auto px-4">
         <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[3rem] p-12 lg:p-20 border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
               <div>
                  <h2 className="text-3xl font-black mb-2">Popular Articles</h2>
                  <p className="text-slate-500 font-medium">Quick answers to the most common questions our students have.</p>
               </div>
               <Link href="#" className="font-bold text-blue-600 hover:underline">View All Articles</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
               {[
                 "How to reset your password",
                 "Payment methods we accept",
                 "Installing our mobile progressive web app",
                 "Sharing your certificate on LinkedIn",
                 "Troubleshooting video loading issues",
                 "Bulk course purchases for teams"
               ].map((text, i) => (
                 <Link key={i} href="#" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all font-bold group">
                    <span className="text-blue-600 bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all"><HelpCircle size={16} /></span>
                    {text}
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* Support CTA */}
      <section className="container mx-auto px-4 pb-24 text-center">
         <ScrollReveal direction="up">
            <div className="p-12 lg:p-24 rounded-[4rem] bg-blue-600 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
               
               <h2 className="text-4xl lg:text-6xl font-black mb-8 relative z-10">Still need help?</h2>
               <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-12 relative z-10 font-medium">
                  If you can't find the answer you're looking for, our friendly support team is always ready to assist you.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link 
                    href="/contact" 
                    className="px-10 py-5 bg-white text-blue-600 rounded-3xl font-black transform hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={24} /> Contact Support
                  </Link>
                  <Link 
                    href="#" 
                    className="px-10 py-5 bg-blue-700 text-white border-2 border-white/20 rounded-3xl font-black transform hover:-translate-y-1 transition-all hover:bg-blue-800 flex items-center justify-center gap-2"
                  >
                    Live Chat Now
                  </Link>
               </div>
            </div>
         </ScrollReveal>
      </section>

    </div>
  );
}
