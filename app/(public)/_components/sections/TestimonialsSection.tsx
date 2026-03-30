import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  initials: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer at Tech Corp",
    content:
      "LearnStack transformed my career! The courses are well-structured, and the instructors are incredibly knowledgeable. I landed my dream job within 3 months.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Ahmed Hassan",
    role: "Data Scientist at Analytics Pro",
    content:
      "The practical projects and hands-on approach made learning easy and engaging. The community support is amazing, and I made great connections here.",
    rating: 5,
    initials: "AH",
  },
  {
    name: "Emily Chen",
    role: "UX Designer at Creative Studio",
    content:
      "I appreciated the comprehensive curriculum covering both design principles and practical tools. The mentorship from experienced designers was invaluable.",
    rating: 5,
    initials: "EC",
  },
  {
    name: "Michael Brown",
    role: "Business Manager at StartUp Inc",
    content:
      "LearnStack's business courses helped me transition from technical to management. The real-world case studies were particularly useful for my role.",
    rating: 5,
    initials: "MB",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Student Success Stories</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Hear from our learners who have achieved their goals and transformed their careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                  />
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-600 dark:bg-blue-500 text-white">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
