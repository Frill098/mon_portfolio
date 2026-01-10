import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition" | "whileHover"> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
        {
          "border-transparent bg-gray-900 text-gray-50 shadow hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200":
            variant === "default",
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700":
            variant === "secondary",
          "border-transparent bg-red-500 text-gray-50 shadow hover:bg-red-600 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-800":
            variant === "destructive",
          "text-gray-950 dark:text-gray-50": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };