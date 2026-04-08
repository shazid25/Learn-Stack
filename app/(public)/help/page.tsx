import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  BookOpen,
  Shield,
  User,
  CreditCard,
  Video,
  Settings,
  Star,
  Globe,
  Lock,
  Bell,
  Zap,
  FileText,
  LifeBuoy,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

// Safe icon lookup map (no wildcard import needed)
const ICON_MAP: Record<string, React.ElementType> = {
  HelpCircle,
  BookOpen,
  Shield,
  User,
  CreditCard,
  Video,
  Settings,
  Star,
  Globe,
  Lock,
  Bell,
  Zap,
  FileText,
  LifeBuoy,
  Search,
  MessageCircle,
};

function getIcon(name?: string | null): React.ElementType {
  if (!name) return HelpCircle;
  return ICON_MAP[name] ?? HelpCircle;
}

export default async function HelpPage() {
  const categories = await prisma.helpCategory.findMany({
    include: {
      articles: {
        take: 3,
        orderBy: { position: "asc" }
      },
      _count: {
        select: { articles: true },
      },
    },
    orderBy: { position: "asc" },
  });

  const popularArticles = await prisma.helpArticle.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: { category: { select: { id: true, title: true } } },
  });

  return (
    <div className="py-24 space-y-24">
      {/* Search Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <ScrollReveal direction="up">
          <Badge
            variant="outline"
            className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-4 py-2 font-bold uppercase tracking-widest text-xs mb-8"
          >
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
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Help Guidelines Section - NEW */}
      <section className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal direction="up">
          <div className="flex flex-col gap-4 mb-12">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <CheckCircle2 className="text-blue-600" size={32} />
              Platform Guidelines
            </h2>
            <p className="text-slate-500 font-medium">Follow our step-by-step guides to master the platform.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {categories.map((cat) => (
              <AccordionItem 
                key={cat.id} 
                value={cat.id} 
                className="border border-slate-200 dark:border-slate-800 rounded-3xl px-8 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="hover:no-underline py-6 font-bold text-lg text-left group">
                  <div className="flex items-center gap-4">
                     <span className="p-2 bg-blue-600/10 text-blue-600 rounded-lg group-data-[state=open]:bg-blue-600 group-data-[state=open]:text-white transition-all">
                        {React.createElement(getIcon(cat.icon), { size: 20 })}
                     </span>
                     {cat.title} Guidelines
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8">
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    {cat.articles.map((article) => (
                      <Link 
                        key={article.id} 
                        href={`/help/article/${article.id}`}
                        className="p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 flex justify-between items-center group/item"
                      >
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-700 dark:text-slate-200">{article.title}</span>
                           <span className="text-xs text-slate-400 line-clamp-1">{article.content.substring(0, 100)}...</span>
                        </div>
                        <ArrowRight size={16} className="text-blue-600 opacity-0 group-hover/item:opacity-100 transform group-hover/item:translate-x-1 transition-all" />
                      </Link>
                    ))}
                    <Link 
                      href={`/help/${cat.id}`}
                      className="text-blue-600 font-black text-sm mt-4 hover:underline flex items-center gap-1 px-4"
                    >
                      View all {cat._count.articles} articles in {cat.title} <ArrowRight size={14} />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const Icon = getIcon(cat.icon);
            return (
              <ScrollReveal key={cat.id} direction="up" delay={i * 0.1}>
                <Link href={`/help/${cat.id}`} className="block h-full">
                  <div className="group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col cursor-pointer">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 text-blue-600 rounded-2xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110 mb-6">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black mb-2">{cat.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium mb-6">{cat.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{cat._count.articles} Articles</span>
                      <ArrowRight size={20} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
          {categories.length === 0 && (
            <div className="col-span-full text-center py-20 opacity-50">
              <HelpCircle className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <p className="text-xl font-bold">No help categories found.</p>
              <p className="text-slate-500 text-sm mt-2">Help content is being prepared. Check back soon!</p>
            </div>
          )}
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {popularArticles.map((article) => (
              <Link
                key={article.id}
                href={`/help/article/${article.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-900 transition-all font-bold group"
              >
                <span className="text-blue-600 bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <HelpCircle size={16} />
                </span>
                <div className="flex flex-col">
                  <span>{article.title}</span>
                  <span className="text-xs text-slate-400 font-medium">{article.category.title}</span>
                </div>
              </Link>
            ))}
            {popularArticles.length === 0 && (
              <p className="text-slate-400 italic col-span-2">No popular articles available yet.</p>
            )}
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
              If you can&apos;t find the answer you&apos;re looking for, our friendly support team is always ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-blue-600 rounded-3xl font-black transform hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle size={24} /> Contact Support
              </Link>
              <Link
                href="/faq"
                className="px-10 py-5 bg-blue-700 text-white border-2 border-white/20 rounded-3xl font-black transform hover:-translate-y-1 transition-all hover:bg-blue-800 flex items-center justify-center gap-2"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
