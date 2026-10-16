import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "tonal";
}

const sizeClasses = {
  sm: "h-9 px-4 text-xs font-medium gap-1.5 rounded-control",
  md: "h-10 px-5 text-sm font-medium gap-2 rounded-control",
  lg: "h-11 px-6 text-sm font-medium gap-2.5 rounded-control",
};

export function SecondaryButton({
  href,
  isExternal,
  icon,
  iconPosition = "right",
  size = "md",
  variant = "outlined",
  className,
  children,
  ...props
}: SecondaryButtonProps) {
  const variantClasses =
    variant === "tonal"
      ? "bg-[#E8F0FE] dark:bg-[#1E293B] text-google-blue dark:text-[#60A5FA] hover:bg-blue-100 dark:hover:bg-[#334155] hover:text-google-blue-dark border border-transparent"
      : "bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] text-google-blue dark:text-[#60A5FA] hover:bg-[#E8F0FE]/50 dark:hover:bg-[#334155]/60 hover:border-google-blue dark:hover:border-[#60A5FA] hover:text-google-blue-dark active:bg-[#E8F0FE]";

  const baseClasses = cn(
    "group inline-flex items-center justify-center font-sans select-none cursor-pointer transition-all duration-150 ease-out active:scale-[0.98]",
    "shadow-sm hover:shadow-md active:shadow-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-google-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F172A]",
    variantClasses,
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span className="inline-flex shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-1">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
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
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}
