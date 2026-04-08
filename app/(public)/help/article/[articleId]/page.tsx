import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  const article = await prisma.helpArticle.findUnique({
    where: { id: articleId },
    include: {
      category: {
        include: {
          articles: { orderBy: { position: "asc" }, take: 5 },
        },
      },
    },
  });

  if (!article) notFound();

  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal direction="up">
          <Link
            href={`/help/${article.categoryId}`}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-12 font-bold group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to {article.category.title}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-3 py-1 font-bold uppercase tracking-widest text-xs"
                >
                  {article.category.title}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {new Date(article.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
                <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white">
                  {article.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed text-base whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Feedback CTA */}
              <div className="mt-12 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
                <p className="font-black text-lg mb-2">Was this article helpful?</p>
                <p className="text-slate-500 text-sm mb-6">Let us know if you need more assistance.</p>
                <Link href="/contact">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-blue-600/20">
                    <MessageCircle size={18} /> Contact Support
                  </button>
                </Link>
              </div>
            </article>

            {/* Sidebar: Related Articles */}
            <aside className="space-y-6">
              <div className="sticky top-24">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-600" />
                  Related Articles
                </h3>
                <nav className="flex flex-col gap-2">
                  {article.category.articles
                    .filter((a) => a.id !== article.id)
                    .map((related) => (
                      <Link
                        key={related.id}
                        href={`/help/article/${related.id}`}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-600 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all group"
                      >
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {related.title}
                        </span>
                      </Link>
                    ))}
                </nav>

                <div className="mt-6 p-6 rounded-2xl bg-blue-600 text-white">
                  <h4 className="font-black mb-2">Need more help?</h4>
                  <p className="text-blue-100 text-sm mb-4">Our team is always ready to assist you.</p>
                  <Link
                    href="/contact"
                    className="text-sm font-black underline hover:no-underline text-white"
                  >
                    Contact us →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
