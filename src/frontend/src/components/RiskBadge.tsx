import { cn } from "@/lib/utils";

type RiskLevel = "critical" | "high" | "medium" | "low";

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const riskConfig: Record<
  RiskLevel,
  { label: string; dot: string; text: string; bg: string; border: string }
> = {
  critical: {
    label: "Critical",
    dot: "bg-red-500",
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  high: {
    label: "High",
    dot: "bg-orange-500",
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  medium: {
    label: "Medium",
    dot: "bg-yellow-500",
    text: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  low: {
    label: "Low",
    dot: "bg-green-500",
    text: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
};

export function RiskBadge({
  level,
  score,
  className,
  size = "md",
}: RiskBadgeProps) {
  const config = riskConfig[level];
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 gap-1",
    md: "text-xs px-2 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        config.bg,
        config.text,
        config.border,
        sizeClasses[size],
        className,
      )}
    >
      <span
        className={cn("rounded-full flex-shrink-0", config.dot, {
          "w-1.5 h-1.5": size === "sm",
          "w-2 h-2": size === "md",
          "w-2.5 h-2.5": size === "lg",
        })}
      />
      {config.label}
      {score !== undefined && (
        <span className="opacity-70 ml-0.5">{score}%</span>
      )}
    </span>
  );
}

export function RiskDot({
  level,
  size = 8,
}: { level: RiskLevel; size?: number }) {
  const config = riskConfig[level];
  return (
    <span
      className={cn("rounded-full flex-shrink-0 inline-block", config.dot)}
      style={{ width: size, height: size }}
    />
  );
}
