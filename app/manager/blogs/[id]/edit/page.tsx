import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogForm } from "../../components/BlogForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/manager/blogs">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex flex-col">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Edit Blog Post</h1>
          <p className="text-slate-500 font-medium">Refine and update your content.</p>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 pb-0">
          <CardTitle>Article Details</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <BlogForm initialData={blog} />
        </CardContent>
      </Card>
    </div>
  );
}
