"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { createBlog, updateBlog } from "@/app/data/manager/blog-actions";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BlogFormProps {
  initialData?: any;
}

export function BlogForm({ initialData }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      category: initialData?.category || "",
      image: initialData?.image || "",
      content: initialData?.content || "",
    },
  });

  async function onSubmit(values: any) {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      if (initialData) {
        await updateBlog(initialData.id, formData);
        toast.success("Blog updated successfully");
      } else {
        await createBlog(formData);
        toast.success("Blog created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Blog Title</FormLabel>
                <FormControl>
                  <Input className="rounded-xl py-6" placeholder="Enter post title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Category</FormLabel>
                <FormControl>
                  <Input className="rounded-xl py-6" placeholder="e.g. AI, Development, UI/UX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Cover Image URL</FormLabel>
              <FormControl>
                <Input className="rounded-xl py-6" placeholder="https://unsplash.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Excerpt (Short Summary)</FormLabel>
              <FormControl>
                <Textarea className="rounded-xl min-h-[100px]" placeholder="Brief description of the post..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Article Content</FormLabel>
              <FormControl>
                <RichTextEditor field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full py-8 text-lg font-black rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all"
        >
          {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
          {initialData ? "Update Blog Post" : "Publish Blog Post"}
        </Button>
      </form>
    </Form>
  );
}
