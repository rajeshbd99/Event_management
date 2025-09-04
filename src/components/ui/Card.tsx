import { cn } from "../../lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md hover:shadow-lg transition transform hover:-translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}
