import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/logo.png";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-4000"></div>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className={`${buttonVariants({
          variant: "outline",
        })} absolute top-4 left-4 sm:top-6 sm:left-6 shadow-lg hover:shadow-xl transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 active:scale-95`}
      >
        <ArrowLeft className="size-4" />
        <span className="hidden sm:inline">Back</span>
      </Link>

      {/* Main Content */}
      <div className="relative flex w-full max-w-md flex-col gap-8 z-10">
        {/* Logo */}
        <Link
          className="flex items-center gap-3 self-center font-bold text-2xl group transition-all duration-300"
          href="/"
        >
          <div className="p-2 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
            <Image src={Logo} alt="Logo" width={32} height={32} />
          </div>
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LearnStack
          </span>
        </Link>

        {/* Form */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
          {children}
        </div>

        {/* Footer */}
        <div className="text-balance text-center text-xs text-gray-600 space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both delay-100">
          <p>
            By clicking continue, you agree to our{" "}
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200">
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-gray-500 text-[11px]">
            © {new Date().getFullYear()} LearnStack. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
