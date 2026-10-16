"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#F8FAFC] dark:bg-[#1E293B]",
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] p-5 flex flex-col gap-4 shadow-subtle",
        className
      )}
    >
      {/* Image Skeleton */}
      <Skeleton className="w-full aspect-[16/10] rounded-xl" />

      {/* Tags Skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>

      {/* Title & Desc Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-4/5 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>

      {/* Footer Skeleton */}
      <div className="pt-3 border-t border-[#D1D5DB] dark:border-[#334155] flex items-center justify-between">
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 max-w-2xl mb-8">
      <Skeleton className="h-6 w-36 rounded-full" />
      <Skeleton className="h-10 sm:h-12 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
    </div>
  );
}
