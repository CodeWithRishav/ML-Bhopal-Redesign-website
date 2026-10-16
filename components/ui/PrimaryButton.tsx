import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-9 px-4 text-xs font-medium gap-1.5 rounded-control",
  md: "h-10 px-5 text-sm font-medium gap-2 rounded-control",
  lg: "h-11 px-6 text-sm font-medium gap-2.5 rounded-control",
};

export function PrimaryButton({
  href,
  isExternal,
  isLoading,
  icon,
  iconPosition = "right",
  size = "md",
  className,
  children,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const baseClasses = cn(
    "group inline-flex items-center justify-center font-sans select-none cursor-pointer transition-all duration-150 ease-out",
    "bg-primary text-white hover:bg-[#FF9A3D] active:bg-[#E66E00] active:scale-[0.98]",
    "shadow-sm hover:shadow-md active:shadow-none",
    "border border-transparent",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F172A]",
    "disabled:opacity-50 disabled:pointer-events-none",
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : null}
      {!isLoading && icon && iconPosition === "left" ? (
        <span className="inline-flex shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-1">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === "right" ? (
        <span className="inline-flex shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
          {content}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button disabled={disabled || isLoading} className={baseClasses} {...props}>
      {content}
    </button>
  );
}
