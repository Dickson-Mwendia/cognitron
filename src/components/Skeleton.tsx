import { type ComponentPropsWithoutRef } from "react";

type SkeletonVariant = "text" | "circle" | "card" | "bar";

interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  variant?: SkeletonVariant;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded",
  circle: "h-12 w-12 rounded-full",
  card: "h-48 w-full rounded-2xl",
  bar: "h-3 w-full rounded-full",
};

/**
 * Reusable skeleton loader with Tailwind animate-pulse.
 *
 * @example
 * <Skeleton variant="card" className="h-48" />
 * <Skeleton variant="text" className="w-3/4" />
 * <Skeleton variant="circle" className="h-16 w-16" />
 */
export function Skeleton({ variant = "text", className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
