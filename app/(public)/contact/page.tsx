"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import { submitContactForm } from "@/app/data/contact-actions";

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      await submitContactForm(formData);
      setIsSent(true);
      toast.success("Message sent perfectly!");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="py-24 space-y-32">
      
      {/* Header Section */}
      <section className="container mx-auto px-4 max-w-4xl text-center">
        <ScrollReveal direction="up">
          <Badge variant="outline" className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-4 py-2 font-bold uppercase tracking-widest text-xs">
            Connect With Us
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mt-6 leading-tight">
            We're here to <span className="text-blue-600">help</span> you grow.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mt-8 max-w-3xl mx-auto">
            Have a question about a course, pricing, or looking for a custom enterprise solution? Our team usually responds within 2 hours.
          </p>
        </ScrollReveal>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Details */}
          <div className="space-y-12">
            <ScrollReveal direction="left">
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Reach out directly</h2>
               <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email Support", value: "support@learnstack.com", desc: "Expect a response within 2 hours." },
                    { icon: Phone, label: "Call Us", value: "+1 (888) LEARN-ST", desc: "Mon-Fri from 9am to 6pm EST." },
                    { icon: MapPin, label: "Headquarters", value: "123 Tech Avenue, Silicon Valley, CA", desc: "Come say hi at our futuristic office." },
                    { icon: Globe, label: "Social", value: "@learnstack_edu", desc: "Join the conversation on Twitter & LinkedIn." },
                  ].map((item, i) => (
                    <div key={i} className="group flex items-start gap-6 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                       <div className="p-4 bg-blue-600/10 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110">
                          <item.icon size={24} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
            <ScrollReveal direction="right" delay={0.2}>
              <Card className="border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-2xl p-10 relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                 {!isSent ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                             <Label className="font-bold text-slate-700 dark:text-slate-300">Your Name</Label>
                             <Input name="name" required className="py-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-medium focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="John Doe" />
                          </div>
                          <div className="space-y-3">
                             <Label className="font-bold text-slate-700 dark:text-slate-300">Email Address</Label>
                             <Input name="email" required type="email" className="py-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-medium focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="john@example.com" />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <Label className="font-bold text-slate-700 dark:text-slate-300">Subject</Label>
                          <Input name="subject" required className="py-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-medium focus-visible:ring-2 focus-visible:ring-blue-600" placeholder="How can we help?" />
                       </div>
                       <div className="space-y-3">
                          <Label className="font-bold text-slate-700 dark:text-slate-300">Message</Label>
                          <textarea 
                            name="message"
                            required 
                            className="w-full min-h-[180px] p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border-none text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                            placeholder="Type your message here..."
                          />
                       </div>
                       <Button 
                        disabled={isSending} 
                        className="w-full py-8 rounded-3xl text-lg font-black bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 active:translate-y-0 transition-all font-bold"
                       >
                         {isSending ? <Loader2 className="mr-2 animate-spin" size={24} /> : <Send className="mr-2" size={24} />}
                         Send Message
                       </Button>
                    </form>
                 ) : (
                    <div className="py-20 text-center space-y-6">
                       <CheckCircle size={80} className="text-emerald-500 mx-auto animate-bounce" />
                       <h3 className="text-3xl font-black">Message Sent!</h3>
                       <p className="text-slate-600 dark:text-slate-400 text-lg">
                         Thanks for reaching out. A member of our team will get back to you shortly.
                       </p>
                       <Button variant="outline" className="rounded-2xl py-6 font-bold" onClick={() => setIsSent(false)}>Send another message</Button>
                    </div>
                 )}
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map or Global Section */}
      <section className="container mx-auto px-4 pb-24">
         <ScrollReveal direction="up">
            <div className="h-96 w-full rounded-[3rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden group border border-slate-200 dark:border-slate-700">
               <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <div className="h-full w-full bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]"></div>
               </div>
               <div className="relative z-10 text-center">
                  <div className="inline-flex p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl mb-4 border border-blue-600/10 dark:border-blue-600/20">
                     <MapPin size={48} className="text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">Our Presence is Global</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs mt-2 italic">Operating in 120+ countries remotely</p>
               </div>
            </div>
         </ScrollReveal>
      </section>

    </div>
  );
}
