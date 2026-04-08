"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "../ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "@/app/(public)/_components/UserDropdown";
import { Badge } from "@/components/ui/badge";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SiteHeader() {
  const { data: session } = authClient.useSession();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-30 transition-all duration-300 px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1 text-slate-500 hover:text-blue-600 transition-colors" />
        <Separator
          orientation="vertical"
          className="mx-2 h-6 bg-slate-200 dark:bg-slate-800"
        />
        <div className="hidden md:flex items-center gap-2">
           <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Learn Stack</h1>
           <Badge variant="outline" className="text-[10px] uppercase font-black border-blue-600/20 text-blue-600 bg-blue-600/5">
             {session?.user?.role || "Student"}
           </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Quick Search - Just UI for now */}
        <div className="hidden lg:flex relative w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
          <Input 
            placeholder="Search everything..." 
            className="pl-10 h-10 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border-none text-sm focus-visible:ring-2 focus-visible:ring-blue-600/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          <ThemeToggle />
          <Separator orientation="vertical" className="h-8 mx-1 bg-slate-200 dark:bg-slate-800" />
          
          {session?.user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {session.user.name}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Active Now
                </span>
              </div>
              <UserDropdown 
                name={session.user.name || "User"} 
                email={session.user.email} 
                image={session.user.image || `https://avatar.vercel.sh/${session.user.email}`} 
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
