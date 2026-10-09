import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "border-transparent bg-violet-600 text-white shadow dark:bg-violet-500":
            variant === "default",
          "border-transparent bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100":
            variant === "secondary",
          "border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300":
            variant === "outline",
          "border-transparent bg-emerald-500/20 text-emerald-700 dark:text-emerald-400":
            variant === "success",
          "border-transparent bg-amber-500/20 text-amber-700 dark:text-amber-400":
            variant === "warning",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
