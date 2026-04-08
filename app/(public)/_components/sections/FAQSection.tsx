"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I get started with Learn-Stack?",
    answer: "Simply create an account, browse our course catalog, and enroll in any course that interests you. You'll get immediate access to all course materials."
  },
  {
    question: "Are the certificates industry-recognized?",
    answer: "Yes, our certificates are valued by top technology companies and can be directly shared to your LinkedIn profile to showcase your skills."
  },
  {
    question: "Can I learn at my own pace?",
    answer: "Absolutely! All our courses are self-paced, allowing you to learn whenever it fits your schedule. Your progress is saved automatically."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee if you're not satisfied with your learning experience. No questions asked."
  },
  {
    question: "Is there a mobile app?",
    answer: "Our platform is fully responsive and works perfectly on mobile browsers. Stay tuned for our native iOS and Android apps coming soon!"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Everything you need to know about our platform and process.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1}>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full ${openIndex === index ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
