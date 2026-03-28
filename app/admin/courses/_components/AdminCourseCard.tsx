"use client";

import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import useConstructUrl from "@/hooks/use-construct-url";
import {
  ArrowRight,
  Eye,
  MoreVertical,
  Pencil,
  School,
  TimerIcon,
  Trash2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { publishCourse, unpublishCourse } from "../[courseId]/edit/actions";
import { useTransition } from "react";
import { toast } from "sonner";

interface iAppProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  const [pending, startTransition] = useTransition();
  const isPublished = data.status === "Published";

  const handlePublish = () => {
    startTransition(async () => {
      const result = await publishCourse(data.id);
      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleUnpublish = () => {
    startTransition(async () => {
      const result = await unpublishCourse(data.id);
      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Card className="group relative py-0 gap-0 transition-all hover:shadow-lg">
      {/* Status Badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
        {isPublished ? (
          <>
            <CheckCircle2 className="size-4 text-green-500" />
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">Published</span>
          </>
        ) : (
          <>
            <Circle className="size-4 text-amber-500" />
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Draft</span>
          </>
        )}
      </div>

      {/* Dropdown Menu */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <Pencil className="size-4 mr-2" />
                Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.slug}`}>
                <Eye className="size-4 mr-2" />
                Preview
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {isPublished ? (
              <DropdownMenuItem onClick={handleUnpublish} disabled={pending}>
                <Circle className="size-4 mr-2 text-amber-500" />
                Unpublish Course
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handlePublish} disabled={pending}>
                <CheckCircle2 className="size-4 mr-2 text-green-500" />
                Publish Course
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/delete`}>
                <Trash2 className="size-4 mr-2 text-destructive" />
                Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Thumbnail Image */}
      <Image
        src={thumbnailUrl}
        alt="Thumbnail Url"
        width={600}
        height={400}
        className="w-full rounded-t-lg aspect-video f-ull object-cover"
      />

      {/* Card Content */}
      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${data.id}/edit`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.duration} h</p>
          </div>
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.level}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            className={buttonVariants({
              className: "flex-1",
            })}
            href={`/admin/courses/${data.id}/edit`}
          >
            Edit Course
            <ArrowRight className="size-4 ml-1" />
          </Link>
          {isPublished ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleUnpublish}
              disabled={pending}
              size="sm"
            >
              {pending ? "..." : "Unpublish"}
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={handlePublish}
              disabled={pending}
              size="sm"
              variant="default"
            >
              {pending ? "..." : "Publish"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminCourseCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2"> 
        <Skeleton className="h-6 w-16 rounded-full"/>
        <Skeleton className="size-8 rounded-md"/>
      </div>
      <div className="w-full relative h-fit">
         <Skeleton className="w-full rounded-t-lg aspect-video h-62.5 object-cover"/>
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2 rounded"/>
        <Skeleton className="h-4 w-full mb-4 rounded"/>
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md"/>
            <Skeleton className="h-4 w-10 rounded"/>
          </div>

          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md"/>
            <Skeleton className="h-4 w-10 rounded"/>
          </div>
        </div>

        <Skeleton className="mt-4 h-10 w-full rounded"/>
      </CardContent>
    </Card>
  )
}