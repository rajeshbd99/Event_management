import { cn } from "../../lib/utils";

export function Section({
  title,
  kicker,
  action,
  children,
  className,
}: {
  title?: string;
  kicker?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-12", className)}>
      <div className="container">
        {(title || kicker || action) && (
          <div className="flex items-end justify-between mb-8">
            <div>
              {kicker && (
                <p className="kicker mb-1 bg-gradient-to-r from-brand-pink to-brand-cyan bg-clip-text text-transparent">
                  {kicker}
                </p>
              )}
              {title && (
                <h2 className="text-3xl font-display font-bold tracking-tight">
                  {title}
                </h2>
              )}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
