"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center bg-linear-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [20, -20, 20],
            y: [20, -20, 20]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        ></motion.div>
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center space-y-6 px-4">
        <ScrollReveal delay={0.1} direction="up">
          <Badge variant="outline" className="mb-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-1.5 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            🌟 The Future of Learning
          </Badge>
        </ScrollReveal>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl">
          <AnimatedText variant="words" delay={0.2} className="block">
            Unlock Your Potential with Learn-Stack
          </AnimatedText>
        </h1>
        
        <ScrollReveal delay={0.4} direction="up" blur={true}>
          <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Join thousands of students mastering top skills through professional courses and expert mentorship.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.6} direction="up" scale={true}>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/courses"
              className={buttonVariants({
                size: "lg",
              }) + " px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300 rounded-full"}
            >
              Get Started Now
            </Link>
            <Link
              href="/about"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              }) + " px-8 py-6 text-lg backdrop-blur-sm border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transform hover:-translate-y-1 transition-all duration-300 rounded-full"}
            >
              Learn More
            </Link>
          </div>
        </ScrollReveal>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-blue-600 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
