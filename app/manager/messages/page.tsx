import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id: string) {
  "use server";
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/manager/messages");
}

export default async function ManagerMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Contact Messages</h1>
        <p className="text-slate-500 font-medium">Manage inquiries from potential students and clients.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.map((msg) => (
          <Card key={msg.id} className="border-slate-200 dark:border-slate-800 shadow-lg rounded-[2.5rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 p-8 border-b border-slate-200 dark:border-slate-800">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-black">
                     {msg.name[0]}
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-lg font-black">{msg.name}</h3>
                     <span className="text-sm text-slate-500 font-medium flex items-center gap-1"><Mail size={14}/> {msg.email}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <Badge variant="outline" className="font-bold border-blue-600/20 text-blue-600">
                     {msg.subject}
                  </Badge>
                  <form action={async () => {
                    "use server";
                    await deleteMessage(msg.id);
                  }}>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
               </div>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
               <div className="pt-4 border-t border-slate-50 dark:border-slate-900 flex items-center text-xs text-slate-400 font-bold uppercase tracking-widest gap-2">
                  <Clock size={14} /> Received on {new Date(msg.createdAt).toLocaleString()}
               </div>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-32 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
             <Mail className="mx-auto h-16 w-16 text-slate-300 mb-4" />
             <h3 className="text-2xl font-black mb-2">Inbox is empty</h3>
             <p className="text-slate-500 pt-2">No contact messages received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
