import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  variant?: "default" | "critical" | "warning" | "success" | "info";
  className?: string;
  "data-ocid"?: string;
}

const variantStyles = {
  default: {
    icon: "text-primary bg-primary/10",
    badge: "text-muted-foreground bg-muted",
  },
  critical: {
    icon: "text-red-400 bg-red-500/10",
    badge: "text-red-400 bg-red-500/10",
  },
  warning: {
    icon: "text-orange-400 bg-orange-500/10",
    badge: "text-orange-400 bg-orange-500/10",
  },
  success: {
    icon: "text-green-400 bg-green-500/10",
    badge: "text-green-400 bg-green-500/10",
  },
  info: {
    icon: "text-primary bg-primary/10",
    badge: "text-primary bg-primary/10",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
  "data-ocid": dataOcid,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "relative bg-card border border-border rounded-lg p-5 flex flex-col gap-3 overflow-hidden",
        "hover:border-border/80 transition-smooth",
        className,
      )}
    >
      {/* Subtle background glow for non-default */}
      {variant !== "default" && (
        <div
          className={cn(
            "absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none",
            {
              "bg-red-500": variant === "critical",
              "bg-orange-500": variant === "warning",
              "bg-green-500": variant === "success",
              "bg-primary": variant === "info",
            },
          )}
        />
      )}
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted-foreground font-body">{title}</p>
        <div className={cn("p-2 rounded-md", styles.icon)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold font-display text-foreground leading-none">
          {value}
        </p>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              styles.badge,
            )}
          >
            {trend.value > 0 ? "+" : ""}
            {trend.value}% {trend.label}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
