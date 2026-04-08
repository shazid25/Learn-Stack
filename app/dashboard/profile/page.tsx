"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Globe,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    location: "Tech City, TC",
    bio: "Passionate learner exploring advanced web development and AI."
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast.success("Profile updated successfully!");
  };

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Profile Header */}
      <div className="relative group">
        <div className="h-48 w-full rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative group/avatar">
            <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-900 shadow-2xl">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="text-3xl font-black bg-slate-100 dark:bg-slate-800 text-blue-600">
                {session?.user?.name?.[0] || session?.user?.email?.[0]}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-1 right-1 p-2 bg-blue-600 text-white rounded-full shadow-lg opacity-0 group-hover/avatar:opacity-100 transition-all hover:scale-110">
              <Camera size={16} />
            </button>
          </div>
          <div className="pb-4">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-none">
              {session?.user?.name || "Student Name"}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-blue-600 text-white border-none px-3 font-bold uppercase tracking-widest text-[10px]">
                {session?.user?.role || "Free Learner"}
              </Badge>
              <span className="flex items-center gap-1 text-sm font-bold text-slate-400">
                <MapPin size={14} /> Tech City, TC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
        
        {/* Settings Navigation */}
        <div className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 p-2 shadow-xl shadow-slate-100/50 dark:shadow-none rounded-3xl overflow-hidden">
            <div className="space-y-1 p-2">
               <Button variant="ghost" className="w-full justify-start gap-3 rounded-2xl py-6 font-bold bg-blue-600/10 text-blue-600 hover:bg-blue-600/20">
                 <User size={20} /> Personal Info
               </Button>
               <Button variant="ghost" className="w-full justify-start gap-3 rounded-2xl py-6 font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white">
                 <Bell size={20} /> Notifications
               </Button>
               <Button variant="ghost" className="w-full justify-start gap-3 rounded-2xl py-6 font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white">
                 <CreditCard size={20} /> Billing & Subscriptions
               </Button>
               <Button variant="ghost" className="w-full justify-start gap-3 rounded-2xl py-6 font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white">
                 <Globe size={20} /> Connected Accounts
               </Button>
            </div>
          </Card>

          <Card className="border-emerald-500/10 dark:border-emerald-500/20 bg-emerald-500/5 p-6 rounded-3xl">
             <div className="flex gap-4">
                <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
                  <ShieldCheck size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-emerald-900 dark:text-emerald-400">Verified Professional</h4>
                   <p className="text-xs font-medium text-emerald-600 opacity-80 mt-1">Your account identity and certificates are fully verified.</p>
                </div>
             </div>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-8">
          <ScrollReveal direction="up">
            <Card className="border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-100/50 dark:shadow-none overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black">Personal Information</CardTitle>
                <CardDescription>Update your personal details and how others see you on the platform.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="font-bold text-slate-600 dark:text-slate-400">Full Name</Label>
                    <div className="relative group">
                       <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                       <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-12 py-6 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 font-bold focus-visible:ring-2 focus-visible:ring-blue-600 transition-all border-none" 
                       />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="font-bold text-slate-600 dark:text-slate-400">Email Address</Label>
                    <div className="relative group">
                       <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                       <Input 
                        value={formData.email}
                        disabled
                        className="pl-12 py-6 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-bold opacity-70 border-none" 
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                    <Label className="font-bold text-slate-600 dark:text-slate-400">Short Bio</Label>
                    <textarea 
                      className="w-full min-h-[120px] p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all leading-relaxed" 
                      placeholder="Tell us a bit about yourself..."
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    />
                </div>
              </CardContent>
              <CardFooter className="p-8 pt-0 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
                 <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
                   <AlertCircle size={14} /> Profile updates are reflected globally across certificates.
                 </p>
                 <Button onClick={handleSave} disabled={isSaving} className="rounded-xl px-10 py-6 font-black bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all">
                   {isSaving ? <Loader2 className="mr-2 animate-spin" size={18} /> : null}
                   Save Changes
                 </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
