"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, FileText, Bell, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "April 1, 2024";

  const sections = [
    {
      icon: Eye,
      title: "Data Collection",
      content: "We collect information you provide directly to us when you create an account, enroll in a course, or communicate with us. This includes your name, email, and billing details."
    },
    {
      icon: Lock,
      title: "How We Use Data",
      content: "Your data helps us personalize your learning experience, process payments, and send important updates about your courses and achievements."
    },
    {
      icon: Shield,
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction."
    },
    {
      icon: Globe,
      title: "Cookies & Tracking",
      content: "We use cookies to improve site performance and understand how you interact with our platform. You can manage cookie preferences in your browser settings."
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
             <div className="p-4 bg-blue-600/10 text-blue-600 rounded-3xl">
                <Shield size={48} />
             </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            Privacy <span className="text-blue-600">Policy</span>
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
                  <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
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
            Welcome to Learn-Stack. We are committed to protecting your personal information and your right to privacy. 
            If you have any questions or concerns about our policy, or our practices with regards to your personal 
            information, please contact us at privacy@learnstack.com.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when registering at the Services 
            expressing an interest in obtaining information about us or our products and services, when 
            participating in activities on the Services or otherwise contacting us.
          </p>

          <h2>3. Third-party Service Providers</h2>
          <p>
            We may share your data with third-party vendors, service providers, contractors or agents who perform 
            services for us or on our behalf and require access to such information to do that work. Examples 
            include payment processing (Stripe), data analysis, email delivery (Resend), and hosting services.
          </p>

          <h2>4. Your Privacy Rights</h2>
          <p>
            In some regions (like the European Economic Area), you have rights that allow you greater access to 
            and control over your personal information. You may review, change, or terminate your account at any time.
          </p>

          <h2>5. Updates to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. The updated version will be indicated by an updated 
            "Revised" date and the updated version will be effective as soon as it is accessible.
          </p>
        </ScrollReveal>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-12 bg-blue-600/5 dark:bg-blue-900/10 rounded-[3rem] border-2 border-dashed border-blue-600/20">
         <ScrollReveal direction="up">
            <h3 className="text-2xl font-black mb-4">Have questions?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">If you're unsure about how your data is handled, please reach out.</p>
            <Link 
              href="/contact" 
              className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/30 transition-all inline-block"
            >
              Contact Privacy Team
            </Link>
         </ScrollReveal>
      </section>

    </div>
  );
}
