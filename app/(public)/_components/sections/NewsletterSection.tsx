"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-blue-600 dark:bg-blue-900/20 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <ScrollReveal direction="up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Stay Inspired and Informed
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Get the latest course updates, coding tips, and exclusive offers delivered directly to your inbox.
          </p>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {!subscribed ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full border border-white/20 max-w-xl mx-auto shadow-2xl"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-8 py-4 bg-transparent text-white placeholder-white/70 focus:outline-none text-lg"
              />
              <button
                type="submit"
                className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Subscribe <Send size={20} />
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl max-w-md mx-auto text-white"
            >
              <div className="flex flex-col items-center gap-4">
                <CheckCircle size={64} className="text-white" />
                <h3 className="text-2xl font-bold">Successfully Subscribed!</h3>
                <p className="text-blue-50">Thanks for joining our community.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollReveal direction="up" delay={0.4}>
          <p className="text-blue-200/60 mt-8 text-sm">
            We respect your privacy and never spam. You can unsubscribe at any time.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
