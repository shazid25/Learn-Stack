import { managerGetBlogs, deleteBlog, toggleBlogPublished } from "@/app/data/manager/blog-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Globe, EyeOff } from "lucide-react";
import Link from "next/link";

export default async function ManagerBlogsPage() {
  const blogs = await managerGetBlogs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Blog Management</h1>
          <p className="text-slate-500 font-medium">Create and manage insights for the community.</p>
        </div>
        <Link href="/manager/blogs/new">
          <Button className="rounded-2xl font-black px-6 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all">
            <Plus className="mr-2 h-5 w-5" /> Publish New Blog
          </Button>
        </Link>
      </div>
      
      <Card className="border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <CardTitle>All Blog Posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-black px-6">Title</TableHead>
                <TableHead className="font-black">Category</TableHead>
                <TableHead className="font-black">Status</TableHead>
                <TableHead className="font-black">Date</TableHead>
                <TableHead className="font-black text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <TableCell className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{blog.title}</span>
                      <span className="text-xs text-slate-400 font-medium truncate max-w-md">{blog.excerpt}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-bold px-3 py-1 rounded-full border-blue-600/20 text-blue-600">
                      {blog.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={blog.published ? "default" : "secondary"} className="capitalize font-black px-3 py-1 rounded-full">
                      {blog.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 font-medium text-sm">
                    {new Date(blog.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Link href={`/blog/${blog.slug}`}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-blue-50 hover:text-blue-600" title="View Publicly">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={async () => {
                        "use server";
                        await toggleBlogPublished(blog.id, blog.published);
                      }}>
                        <Button type="submit" variant="ghost" size="icon" className={`rounded-xl ${blog.published ? "hover:bg-orange-50 hover:text-orange-600" : "hover:bg-emerald-50 hover:text-emerald-600"}`} title={blog.published ? "Unpublish" : "Publish"}>
                          {blog.published ? <EyeOff className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                        </Button>
                      </form>
                      <Link href={`/manager/blogs/${blog.id}/edit`}>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800" title="Edit Article">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteBlog(blog.id);
                      }}>
                        <Button type="submit" variant="ghost" size="icon" className="rounded-xl hover:bg-red-50 hover:text-red-600" title="Delete Article">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {blogs.length === 0 && (
                <TableRow>
                   <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2 opacity-50">
                         <Plus className="h-12 w-12 mb-2" />
                         <p className="font-black text-xl">No blogs published yet.</p>
                         <p className="text-sm">Start sharing insights with the world!</p>
                      </div>
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
