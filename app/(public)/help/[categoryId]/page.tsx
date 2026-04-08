import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
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
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, React.ElementType> = {
  HelpCircle, BookOpen, Shield, User, CreditCard, Video,
  Settings, Star, Globe, Lock, Bell, Zap, FileText, LifeBuoy,
};

function getIcon(name?: string | null): React.ElementType {
  if (!name) return HelpCircle;
  return ICON_MAP[name] ?? HelpCircle;
}

export default async function HelpCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  const category = await prisma.helpCategory.findUnique({
    where: { id: categoryId },
    include: {
      articles: { orderBy: { position: "asc" } },
    },
  });

  if (!category) notFound();

  const Icon = getIcon(category.icon);

  return (
    <div className="py-24 space-y-16">
      {/* Header */}
      <section className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal direction="up">
          <Link
            href="/help"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-12 font-bold group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Help Center
          </Link>

          <div className="flex items-center gap-6 mb-8">
            <div className="p-5 bg-blue-600/10 text-blue-600 rounded-3xl">
              <Icon size={36} />
            </div>
            <div>
              <Badge
                variant="outline"
                className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-3 py-1 font-bold uppercase tracking-widest text-xs mb-3"
              >
                Help Center
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                {category.title}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                {category.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Articles Accordion */}
      <section className="container mx-auto px-4 max-w-4xl pb-16">
        {category.articles.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-4">
            {category.articles.map((article, i) => (
              <ScrollReveal key={article.id} direction="up" delay={i * 0.08}>
                <AccordionItem
                  value={article.id}
                  className="border border-slate-200 dark:border-slate-800 rounded-3xl px-8 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline py-6 font-bold text-lg text-left">
                    {article.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed pb-6 text-base whitespace-pre-line">
                    {article.content}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-32 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <HelpCircle className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-2xl font-black mb-2">No articles yet</h3>
            <p className="text-slate-500">Content for this category is coming soon!</p>
          </div>
        )}

        {/* Support CTA */}
        <div className="mt-16 p-10 rounded-[3rem] border-2 border-blue-600/20 bg-blue-50/30 dark:bg-blue-900/10 text-center">
          <h2 className="text-2xl font-black mb-3">Didn&apos;t find what you were looking for?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
            Our support team is ready to help you with any questions.
          </p>
          <Link href="/contact">
            <button className="px-10 py-4 bg-blue-600 text-white rounded-3xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mx-auto">
              <MessageCircle size={20} /> Contact Support
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
