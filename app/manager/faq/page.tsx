import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, HelpCircle } from "lucide-react";
import { deleteFAQ, createFAQ, updateFAQ } from "@/app/data/manager/faq-actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function ManagerFAQPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { position: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">FAQ Management</h1>
          <p className="text-slate-500 font-medium">Manage frequently asked questions to help users.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-2xl font-black px-6 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all">
              <Plus className="mr-2 h-5 w-5" /> Add New FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
            </DialogHeader>
            <form action={createFAQ} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="question" className="font-bold">Question</Label>
                <Input id="question" name="question" required className="rounded-xl py-6" placeholder="What is Learn-Stack?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="font-bold">Category</Label>
                <Input id="category" name="category" required className="rounded-xl py-6" placeholder="General, Billing, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer" className="font-bold">Answer</Label>
                <Textarea id="answer" name="answer" required className="rounded-xl min-h-[150px]" placeholder="Explain the answer here..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="font-bold">Display Position (Order)</Label>
                <Input id="position" name="position" type="number" defaultValue="0" className="rounded-xl py-6" />
              </div>
              <Button type="submit" className="w-full py-6 rounded-2xl font-black bg-blue-600 hover:bg-blue-700">Create FAQ</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {faqs.map((faq) => (
          <Card key={faq.id} className="border-slate-200 dark:border-slate-800 shadow-lg rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 p-8 border-b border-slate-200 dark:border-slate-800">
               <div className="flex flex-col gap-1">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{faq.category}</span>
                  <CardTitle className="text-xl font-black">{faq.question}</CardTitle>
               </div>
               <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit FAQ</DialogTitle>
                      </DialogHeader>
                      <form action={updateFAQ.bind(null, faq.id)} className="space-y-6 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="question" className="font-bold">Question</Label>
                          <Input id="question" name="question" defaultValue={faq.question} required className="rounded-xl py-6" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category" className="font-bold">Category</Label>
                          <Input id="category" name="category" defaultValue={faq.category} required className="rounded-xl py-6" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="answer" className="font-bold">Answer</Label>
                          <Textarea id="answer" name="answer" defaultValue={faq.answer} required className="rounded-xl min-h-[150px]" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position" className="font-bold">Display Position (Order)</Label>
                          <Input id="position" name="position" type="number" defaultValue={faq.position} className="rounded-xl py-6" />
                        </div>
                        <Button type="submit" className="w-full py-6 rounded-2xl font-black bg-blue-600 hover:bg-blue-700">Update FAQ</Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <form action={deleteFAQ.bind(null, faq.id)}>
                    <Button type="submit" variant="ghost" size="icon" className="rounded-xl hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
               </div>
            </CardHeader>
            <CardContent className="p-8">
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
        {faqs.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 opacity-50">
             <Plus className="mx-auto h-12 w-12 mb-4" />
             <p className="font-black text-xl">No FAQs available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
