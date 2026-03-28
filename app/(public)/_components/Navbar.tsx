"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/public/logo.png";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown";
import { Menu, X } from "lucide-react";

const navigationItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors duration-300 animate-slide-down">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-4 group">
          <div className="relative">
            <Image src={Logo} alt="Logo" className="size-9 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 hidden sm:inline">Learn Stack</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                image={
                  session?.user?.image ??
                  `https://avatar.vercel.sh/${session?.user?.email}`
                }
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" }) + " hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg"}
                >
                  Login
                </Link>
                <Link href="/login" className={buttonVariants() + " hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700"}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button & Controls */}
        <div className="md:hidden ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2 mb-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-300 block group relative"
                >
                  <span className="relative">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col gap-3">
              {isPending ? null : session ? (
                <UserDropdown
                  email={session.user.email}
                  image={
                    session?.user?.image ??
                    `https://avatar.vercel.sh/${session?.user?.email}`
                  }
                  name={
                    session?.user.name && session.user.name.length > 0
                      ? session.user.name
                      : session?.user.email.split("@")[0]
                  }
                />
              ) : (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "secondary" }) + " w-full justify-center hover:scale-105 transform transition-all duration-300"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/login"
                    className={buttonVariants() + " w-full justify-center hover:scale-105 transform transition-all duration-300 bg-blue-600 hover:bg-blue-700"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
