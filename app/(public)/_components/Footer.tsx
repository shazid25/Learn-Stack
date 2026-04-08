import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Github, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
  ];

  const quickLinks = [
    { label: "Browse Courses", href: "/courses" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  const learningLinks = [
    { label: "Knowledge Base", href: "/help" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Student Dashboard", href: "/dashboard" },
  ];

  return (
    <footer className="footer-glass relative bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl text-slate-700 dark:text-slate-200 border-t border-white/20 dark:border-white/10 transition-colors duration-300">
      {/* Animated background elements (dark mode only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:block hidden">
        <div className="absolute top-10 right-20 w-40 h-40 bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-4000"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 md:mb-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-6 animate-slide-up">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">LearnStack</h3>
              <div className="w-12 h-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Empowering learners with comprehensive, interactive courses designed by industry experts worldwide.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 hover:scale-110 transform"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 animate-slide-up delay-100">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Learning */}
          <div className="flex flex-col gap-4 animate-slide-up delay-150">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Learning</h4>
            <nav className="flex flex-col gap-3">
              {learningLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 animate-slide-up delay-200">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Contact</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:support@learnstack.com"
                className="flex gap-3 items-start group p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
                  <p className="text-slate-900 dark:text-slate-200 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    support@learnstack.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+1234567890"
                className="flex gap-3 items-start group p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Phone</p>
                  <p className="text-slate-900 dark:text-slate-200 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    +1 (234) 567-890
                  </p>
                </div>
              </a>
              <div className="flex gap-3 items-start p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Location</p>
                  <p className="text-slate-900 dark:text-slate-200 text-sm">
                    123 Learning St, Tech City, TC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 my-8 md:my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <p>&copy; {currentYear} LearnStack. All rights reserved. Built with care.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-end">
            <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
