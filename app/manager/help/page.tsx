import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, FolderPlus, FilePlus, ChevronRight } from "lucide-react";
import { 
  createHelpCategory, 
  updateHelpCategory, 
  deleteHelpCategory,
  createHelpArticle,
  updateHelpArticle,
  deleteHelpArticle 
} from "@/app/data/manager/help-actions";
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

export default async function ManagerHelpPage() {
  const categories = await prisma.helpCategory.findMany({
    include: {
      articles: {
        orderBy: { position: "asc" }
      }
    },
    orderBy: { position: "asc" },
  });

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Help Center Management</h1>
          <p className="text-slate-500 font-medium">Manage help categories and articles for your users.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-2xl font-black px-6 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all">
              <FolderPlus className="mr-2 h-5 w-5" /> New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-xl">
            <DialogHeader>
              <DialogTitle>Create Help Category</DialogTitle>
            </DialogHeader>
            <form action={createHelpCategory} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-bold">Category Title</Label>
                <Input id="title" name="title" required className="rounded-xl py-6" placeholder="e.g. Account & Profile" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="font-bold">Description</Label>
                <Input id="description" name="description" required className="rounded-xl py-6" placeholder="Short description..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon" className="font-bold">Icon Name (Lucide)</Label>
                <Input id="icon" name="icon" defaultValue="User" className="rounded-xl py-6" placeholder="User, Shield, Box, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="font-bold">Display Position</Label>
                <Input id="position" name="position" type="number" defaultValue="0" className="rounded-xl py-6" />
              </div>
              <Button type="submit" className="w-full py-6 rounded-2xl font-black bg-blue-600 hover:bg-blue-700">Create Category</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-6">
             <div className="flex justify-between items-center border-b-2 border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex flex-col">
                   <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <ChevronRight className="text-blue-600" /> {cat.title}
                   </h2>
                   <p className="text-slate-500 font-medium text-sm ml-8">{cat.description}</p>
                </div>
                <div className="flex gap-2">
                   {/* Edit Category */}
                   <Dialog>
                      <DialogTrigger asChild>
                         <Button variant="outline" size="sm" className="rounded-xl font-bold">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                         </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl max-w-xl">
                         <DialogHeader>
                           <DialogTitle>Edit Category</DialogTitle>
                         </DialogHeader>
                         <form action={async (formData) => {
                           "use server";
                           await updateHelpCategory(cat.id, formData);
                         }} className="space-y-6 pt-4">
                           {/* Fields same as create but with defaultValues */}
                           <div className="space-y-2">
                              <Label htmlFor="title" className="font-bold">Category Title</Label>
                              <Input id="title" name="title" defaultValue={cat.title} required className="rounded-xl py-6" />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="description" className="font-bold">Description</Label>
                              <Input id="description" name="description" defaultValue={cat.description} required className="rounded-xl py-6" />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="icon" className="font-bold">Icon Name</Label>
                              <Input id="icon" name="icon" defaultValue={cat.icon || "User"} className="rounded-xl py-6" />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="position" className="font-bold">Position</Label>
                              <Input id="position" name="position" type="number" defaultValue={cat.position} className="rounded-xl py-6" />
                           </div>
                           <Button type="submit" className="w-full py-6 rounded-2xl font-black bg-blue-600 hover:bg-blue-700">Update Category</Button>
                        </form>
                      </DialogContent>
                   </Dialog>
                   
                   <form action={async () => {
                     "use server";
                     await deleteHelpCategory(cat.id);
                   }}>
                     <Button type="submit" variant="ghost" size="sm" className="rounded-xl text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                     </Button>
                   </form>

                   {/* Add Article Button */}
                   <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="rounded-xl font-black bg-blue-600 hover:bg-blue-700 ml-4">
                           <Plus className="mr-1 h-4 w-4" /> Add Article
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl max-w-2xl">
                         <DialogHeader>
                           <DialogTitle>New Article in {cat.title}</DialogTitle>
                         </DialogHeader>
                         <form action={async (formData) => {
                           "use server";
                           formData.append("categoryId", cat.id);
                           await createHelpArticle(formData);
                         }} className="space-y-6 pt-4">
                            <div className="space-y-2">
                               <Label htmlFor="title" className="font-bold">Article Title</Label>
                               <Input id="title" name="title" required className="rounded-xl py-6" placeholder="How to..." />
                            </div>
                            <div className="space-y-2">
                               <Label htmlFor="content" className="font-bold">Content</Label>
                               <Textarea id="content" name="content" required className="rounded-xl min-h-[200px]" placeholder="Detailed guide..." />
                            </div>
                            <div className="space-y-2">
                               <Label htmlFor="position" className="font-bold">Position</Label>
                               <Input id="position" name="position" type="number" defaultValue="0" className="rounded-xl py-6" />
                            </div>
                            <Button type="submit" className="w-full py-6 rounded-2xl font-black bg-blue-600 hover:bg-blue-700">Create Article</Button>
                         </form>
                      </DialogContent>
                   </Dialog>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.articles.map((article) => (
                   <Card key={article.id} className="border-slate-200 dark:border-slate-800 shadow-md group rounded-3xl overflow-hidden hover:border-blue-600 transition-all">
                      <CardHeader className="flex flex-row justify-between items-start space-y-0">
                         <CardTitle className="text-lg font-bold">{article.title}</CardTitle>
                         <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Update Article (Simplified for this example) */}
                            <form action={async () => {
                               "use server";
                               await deleteHelpArticle(article.id);
                            }}>
                               <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 rounded-lg">
                                  <Trash2 className="h-4 w-4" />
                               </Button>
                            </form>
                         </div>
                      </CardHeader>
                      <CardContent>
                         <p className="text-sm text-slate-500 line-clamp-3">{article.content}</p>
                      </CardContent>
                   </Card>
                ))}
                {cat.articles.length === 0 && (
                   <div className="col-span-full py-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-slate-400 text-sm font-medium italic">No articles in this category yet.</p>
                   </div>
                )}
             </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="text-center py-32 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
             <FolderPlus className="mx-auto h-16 w-16 text-slate-300 mb-4" />
             <h3 className="text-2xl font-black mb-2">No help categories found.</h3>
             <p className="text-slate-500 max-w-sm mx-auto">Start by creating your first help category to organize your documentation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
