"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, UserCheck, AlertOctagon, Scale, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "April 1, 2024";

  const sections = [
    {
      icon: UserCheck,
      title: "Agreement to Terms",
      content: "These Terms of Service constitute a legally binding agreement made between you and Learn-Stack, concerning your access to and use of our platform."
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      content: "All course content, source code, databases, software, and website designs are our proprietary property and are protected by copyright and trademark laws."
    },
    {
      icon: Scale,
      title: "User Representations",
      content: "By using our platform, you represent that you have the legal capacity to comply with these terms and that you are not a minor in your jurisdiction."
    },
    {
      icon: AlertOctagon,
      title: "Prohibited Activities",
      content: "You may not access or use the platform for any purpose other than that for which we make the platform available."
    }
  ];

  return (
    <div className="py-24 space-y-24 container mx-auto px-4 max-w-4xl">
      
      {/* Header */}
      <section className="text-center space-y-6">
        <ScrollReveal direction="up">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-4 transition-all mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex justify-center mb-6">
             <div className="p-4 bg-purple-600/10 text-purple-600 rounded-3xl">
                <FileText size={48} />
             </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            Terms <span className="text-purple-600">& Conditions</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs mt-4">
            Last Updated: {lastUpdated}
          </p>
        </ScrollReveal>
      </section>

      {/* Grid Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((s, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 0.1}>
            <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 h-full">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-500/20">
                     <s.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
               </div>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.content}</p>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* Detailed Content */}
      <section className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl">
        <ScrollReveal direction="up">
          <h2>1. Introduction</h2>
          <p>
            By accessing or using the Learn-Stack Services, you acknowledge that you have read, understood, and agree 
            to be bound by these Terms of Service. If you do not agree, you are prohibited from using the platform.
          </p>

          <h2>2. User Registration</h2>
          <p>
            You may be required to register with the Services. You agree to keep your password confidential and 
            will be responsible for all use of your account and password. We reserve the right to remove or 
            change a username if we determine it is inappropriate.
          </p>

          <h2>3. Course Access & Purchases</h2>
          <p>
            When you purchase a course on Learn-Stack, you are granted a non-exclusive, non-transferable license 
            to view the course content for your own personal, educational use. Courses are subject to 
            availability and price changes at any time.
          </p>

          <h2>4. Content Moderation</h2>
          <p>
            We reserve the right, but not the obligation, to monitor the Services for violations of these 
            Terms of Service and take appropriate legal action against anyone who violates the law or these terms.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party 
            for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages.
          </p>
        </ScrollReveal>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-12 bg-purple-600/5 dark:bg-purple-900/10 rounded-[3rem] border-2 border-dashed border-purple-600/20">
         <ScrollReveal direction="up">
            <h3 className="text-2xl font-black mb-4">Legal Concerns?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">If you're unsure about our terms, please contact our legal team.</p>
            <Link 
              href="/contact" 
              className="px-10 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/30 transition-all inline-block"
            >
              Contact Legal Team
            </Link>
         </ScrollReveal>
      </section>

    </div>
  );
}
