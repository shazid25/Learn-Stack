"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const partners = [
  "Google", "Microsoft", "Amazon", "Meta", "Netflix", "IBM", "Adobe", "Intel", "Oracle", "Spotify"
];

export default function PartnersSection() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <ScrollReveal direction="up">
          <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Trusted by the world's most innovative companies
          </p>
        </ScrollReveal>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap items-center px-4"
        >
          {[...partners, ...partners].map((partner, index) => (
            <span 
              key={index} 
              className="text-2xl md:text-3xl font-bold text-slate-300 dark:text-slate-700 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-default"
            >
              {partner}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
