import { cn } from "../../lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-gradient-to-r from-brand-pink to-brand-cyan px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
