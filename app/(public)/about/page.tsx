import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, Target, Shield, Zap, Award, Globe } from "lucide-react";
import { prisma } from "@/lib/db";

const values = [
  { icon: Target, title: "Our Mission", desc: "To democratize high-quality education and make skill-building accessible to everyone, everywhere." },
  { icon: Shield, title: "Excellence", desc: "We maintain the highest standards of course quality, ensuring every lesson is industry-relevant." },
  { icon: Zap, title: "Innovation", desc: "Using AI and interactive tools to transform how people learn and retain knowledge." },
];

export default async function AboutPage() {
  const [userCount, courseCount, chapterCount, teamMembers] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.chapter.count(),
    prisma.user.findMany({
      where: {
        role: { in: ["admin", "manager"] },
        NOT: { image: null }
      },
      take: 4,
      orderBy: { createdAt: "asc" }
    })
  ]);

  return (
    <div className="py-24 space-y-32">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <ScrollReveal direction="left">
              <Badge variant="outline" className="bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 px-4 py-2 font-bold uppercase tracking-widest text-xs">
                Our Story
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
                Empowering the next <span className="text-blue-600">generation</span> of creators.
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
                Learn-Stack started with a simple belief: that the best education should be built by the world's best practitioners. 
                We've built a platform that bridges the gap between traditional learning and modern industry demands.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600 rounded-3xl opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600 rounded-3xl opacity-10 animate-pulse delay-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80" 
                alt="Team working together" 
                className="rounded-[3rem] shadow-2xl relative z-10 border-8 border-white dark:border-slate-900"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Active Learners", value: `${Math.floor(userCount / 100) * 100}+`, icon: Users },
              { label: "Expert Courses", value: `${courseCount}+`, icon: Award },
              { label: "Lesson Chapters", value: `${chapterCount}+`, icon: Globe },
              { label: "Success Rate", value: "98%", icon: Zap },
            ].map((stat, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-white/5 text-blue-400 mb-4 border border-white/10">
                    <stat.icon size={32} />
                  </div>
                  <h3 className="text-5xl font-black text-white">{stat.value}</h3>
                  <p className="text-blue-200/50 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Values that drive us</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Our core principles guide every decision we make and every course we build.
            </p>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <Card className="h-full border-slate-200 dark:border-slate-800 rounded-3xl hover:border-blue-600 transition-all p-8 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                  <v.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Meet the Visionaries</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                A diverse team of experts dedicated to revolutionizing education.
              </p>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((t, i) => (
              <ScrollReveal key={t.id} direction="up" delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative mb-6 mx-auto w-48 h-48">
                    <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform opacity-10"></div>
                    <img 
                      src={t.image || `https://avatar.vercel.sh/${t.email}`} 
                      alt={t.name}
                      className="w-full h-full object-cover rounded-[2.5rem] relative z-10 grayscale hover:grayscale-0 transition-all duration-500 scale-95 group-hover:scale-100"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.name}</h3>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase mt-1">{t.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
