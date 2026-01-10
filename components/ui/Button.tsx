import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "whileHover" | "whileTap"> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50",
      {
        // Variants
        "bg-gray-100 text-gray-900 shadow hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700":
          variant === "default",
        "bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600":
          variant === "secondary",
        "border border-gray-300 bg-transparent shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-100":
          variant === "outline",
        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100":
          variant === "ghost",
      },
      {
        // Sizes
        "h-9 px-4 py-2": size === "default",
        "h-8 rounded-md px-3 text-xs": size === "sm",
        "h-10 rounded-md px-8": size === "lg",
      },
      className
    );

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };