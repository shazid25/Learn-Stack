import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { position: "asc" }
  });

  const categories = Array.from(new Set(faqs.map(f => f.category)));

  return (
    <div className="py-24 space-y-24">
      {/* Header */}
      <section className="container mx-auto px-4 max-w-4xl text-center">
        <ScrollReveal direction="up">
          <Badge variant="outline" className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-4 py-2 font-bold uppercase tracking-widest text-xs">
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mt-6 leading-tight">
            Common questions, <span className="text-blue-600">clear</span> answers.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mt-8 max-w-3xl mx-auto">
            Everything you need to know about Learn-Stack, our courses, and our learning methodologies.
          </p>
        </ScrollReveal>
      </section>

      {/* FAQ Accordion */}
      <section className="container mx-auto px-4 max-w-4xl pb-24">
        {categories.length > 0 ? (
          <div className="space-y-16">
            {categories.map((cat, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <div className="space-y-8">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center"><HelpCircle size={20}/></span>
                    {cat}
                  </h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.filter(f => f.category === cat).map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="border border-slate-200 dark:border-slate-800 rounded-3xl px-8 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                        <AccordionTrigger className="hover:no-underline py-6 font-bold text-lg text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed pb-6 text-base">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
             <HelpCircle className="mx-auto h-12 w-12 text-slate-400 mb-4" />
             <h3 className="text-2xl font-black mb-2">No FAQs found</h3>
             <p className="text-slate-500">Our team is currently compiling common questions. Check back soon!</p>
          </div>
        )}

        {/* Support CTA */}
        <div className="mt-24 p-12 lg:p-20 rounded-[4rem] border-2 border-blue-600/20 bg-blue-50/30 dark:bg-blue-900/10 text-center">
            <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto font-medium">
               Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <Link href="/contact">
              <button className="px-10 py-5 bg-blue-600 text-white rounded-3xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mx-auto">
                 <MessageCircle size={20} /> Get in touch
              </button>
            </Link>
        </div>
      </section>
    </div>
  );
}
