import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useConstructUrl from "@/hooks/use-construct-url";
import { School, Timer, Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  // Mock rating for premium feel
  const rating = 4.8;
  const reviewsCount = 124;

  return (
    <Card className="group h-full flex flex-col border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 rounded-2xl">
      <div className="relative aspect-video overflow-hidden">
        <Badge className="absolute top-4 left-4 z-10 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg">
          {data.level}
        </Badge>
        
        <Image
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={thumbnailUrl}
          alt={data.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1">
            Explore Course <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {data.category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{rating}</span>
          </div>
        </div>
        <Link href={`/courses/${data.slug}`} className="block">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {data.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="p-5 pt-3 flex-grow">
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {data.smallDescription}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Timer size={16} className="text-blue-500" />
               <span className="text-xs font-medium">{data.duration}h</span>
             </div>
             <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
               <School size={16} className="text-blue-500" />
               <span className="text-xs font-medium">VerifiedContent</span>
             </div>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white">
            ${data.price}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Link
          href={`/courses/${data.slug}`}
          className={buttonVariants({ 
            variant: "outline",
            className: "w-full rounded-xl border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-bold" 
          })}
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="h-full flex flex-col border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden rounded-2xl">
      <Skeleton className="w-full aspect-video" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl mt-4" />
      </div>
    </Card>
  );
}
