import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RiskBadge } from "@/components/RiskBadge";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdvisorStats,
  useRiskDistribution,
  useRiskTrend,
} from "@/hooks/useInterventions";
import { useSeedSampleData, useStudents } from "@/hooks/useStudents";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const RISK_COLORS = {
  critical: "oklch(0.55 0.22 25)",
  high: "oklch(0.65 0.18 55)",
  medium: "oklch(0.68 0.15 85)",
  low: "oklch(0.62 0.16 145)",
} as const;

const CHART_BG = "oklch(0.19 0.012 260)";
const CHART_BORDER = "1px solid oklch(0.28 0.02 260)";
const CHART_TEXT = "oklch(0.55 0.01 260)";
const CHART_GRID = "oklch(0.28 0.02 260)";

type TooltipStyleProps = {
  background: string;
  border: string;
  borderRadius: string;
  color: string;
  fontSize: string;
  boxShadow: string;
};

const tooltipStyle: TooltipStyleProps = {
  background: CHART_BG,
  border: CHART_BORDER,
  borderRadius: "8px",
  color: "oklch(0.92 0.01 260)",
  fontSize: "12px",
  boxShadow: "0 8px 24px oklch(0 0 0 / 0.4)",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <DashboardContent />
      </Layout>
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { data: stats, isLoading: statsLoading } = useAdvisorStats();
  const { data: distribution, isLoading: distLoading } = useRiskDistribution();
  const { data: trend, isLoading: trendLoading } = useRiskTrend();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const seedMutation = useSeedSampleData();

  const handleSeed = async () => {
    try {
      await seedMutation.mutateAsync();
      toast.success("Sample data loaded", {
        description: "40+ students added to the system.",
      });
    } catch {
      toast.error("Failed to seed data");
    }
  };

  const pieData = distribution
    ? [
        {
          name: "Critical",
          value: distribution.critical,
          color: RISK_COLORS.critical,
        },
        { name: "High", value: distribution.high, color: RISK_COLORS.high },
        {
          name: "Medium",
          value: distribution.medium,
          color: RISK_COLORS.medium,
        },
        { name: "Low", value: distribution.low, color: RISK_COLORS.low },
      ].filter((d) => d.value > 0)
    : [];

  const atRiskStudents =
    students
      ?.filter((s) => s.riskLevel === "critical" || s.riskLevel === "high")
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 8) ?? [];

  const isEmpty = !studentsLoading && (!students || students.length === 0);

  const totalDistribution = distribution
    ? distribution.critical +
      distribution.high +
      distribution.medium +
      distribution.low
    : 0;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
            Academic Risk Monitor
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Student dropout prediction &amp; intervention tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isEmpty ? (
            <Button
              type="button"
              data-ocid="dashboard.seed_data.button"
              onClick={handleSeed}
              disabled={seedMutation.isPending}
              variant="outline"
              size="sm"
              className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
            >
              <Database className="w-4 h-4" />
              {seedMutation.isPending ? "Loading…" : "Load Sample Data"}
            </Button>
          ) : (
            <Link to="/students" data-ocid="dashboard.view_all_header.link">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 border-border"
              >
                <Users className="w-4 h-4" />
                View All Students
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Empty State */}
      {isEmpty && !seedMutation.isPending && (
        <div
          data-ocid="dashboard.empty_state"
          className="bg-card border border-border rounded-xl p-16 text-center space-y-5"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <Database className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              No student data yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Load the sample dataset to explore the full system with 40+
              pre-configured students across all risk levels.
            </p>
          </div>
          <Button
            type="button"
            data-ocid="dashboard.empty_seed.button"
            onClick={handleSeed}
            className="gap-2 bg-primary text-primary-foreground"
          >
            <Database className="w-4 h-4" />
            Load 40+ Sample Students
          </Button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))
        ) : (
          <>
            <StatCard
              data-ocid="dashboard.total_students.card"
              title="Total Students"
              value={stats?.totalStudents ?? 0}
              icon={Users}
              variant="default"
              subtitle="Enrolled & monitored"
            />
            <StatCard
              data-ocid="dashboard.at_risk.card"
              title="At-Risk Students"
              value={stats?.atRiskStudents ?? 0}
              icon={AlertTriangle}
              variant="warning"
              subtitle="Require attention"
              trend={
                stats?.totalStudents
                  ? {
                      value: Math.round(
                        (stats.atRiskStudents / stats.totalStudents) * 100,
                      ),
                      label: "of total",
                    }
                  : undefined
              }
            />
            <StatCard
              data-ocid="dashboard.active_interventions.card"
              title="Active Interventions"
              value={stats?.activeInterventions ?? 0}
              icon={Activity}
              variant="info"
              subtitle={`${stats?.resolvedInterventions ?? 0} resolved`}
            />
            <StatCard
              data-ocid="dashboard.critical.card"
              title="Critical Cases"
              value={stats?.criticalStudents ?? 0}
              icon={ShieldAlert}
              variant="critical"
              subtitle="Immediate action needed"
            />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Risk Distribution Donut */}
        <div
          className="lg:col-span-2 bg-card border border-border rounded-xl p-5"
          data-ocid="dashboard.risk_distribution.card"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-semibold text-foreground">
              Risk Distribution
            </h3>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Current semester breakdown
          </p>

          {distLoading ? (
            <Skeleton className="h-52 w-full rounded-lg" />
          ) : pieData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value: number, name: string) => [
                      `${value} students (${totalDistribution ? Math.round((value / totalDistribution) * 100) : 0}%)`,
                      name,
                    ]}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "11px", color: CHART_TEXT }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Distribution counts */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  {
                    label: "Critical",
                    count: distribution?.critical ?? 0,
                    color: "text-red-400",
                    bg: "bg-red-500/10",
                  },
                  {
                    label: "High",
                    count: distribution?.high ?? 0,
                    color: "text-orange-400",
                    bg: "bg-orange-500/10",
                  },
                  {
                    label: "Medium",
                    count: distribution?.medium ?? 0,
                    color: "text-yellow-400",
                    bg: "bg-yellow-500/10",
                  },
                  {
                    label: "Low",
                    count: distribution?.low ?? 0,
                    color: "text-green-400",
                    bg: "bg-green-500/10",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-md ${item.bg}`}
                  >
                    <span className={`text-xs font-medium ${item.color}`}>
                      {item.label}
                    </span>
                    <span className={`text-xs font-bold ${item.color}`}>
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-52 flex items-center justify-center text-sm text-muted-foreground">
              No data available
            </div>
          )}
        </div>

        {/* Risk Trend Line Chart */}
        <div
          className="lg:col-span-3 bg-card border border-border rounded-xl p-5"
          data-ocid="dashboard.risk_trend.card"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-semibold text-foreground">
              Risk Trend
            </h3>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            6-month rolling overview by risk level
          </p>

          {trendLoading ? (
            <Skeleton className="h-52 w-full rounded-lg" />
          ) : trend && trend.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={trend}
                margin={{ top: 5, right: 10, bottom: 5, left: -10 }}
              >
                <XAxis
                  dataKey="periodLabel"
                  tick={{ fontSize: 10, fill: CHART_TEXT }}
                  axisLine={{ stroke: CHART_GRID }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: CHART_TEXT }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px", color: CHART_TEXT }}
                />
                {(["critical", "high", "medium", "low"] as const).map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={RISK_COLORS[key]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-52 flex items-center justify-center text-sm text-muted-foreground">
              No trend data available
            </div>
          )}
        </div>
      </div>

      {/* At-Risk Students Table */}
      <div
        className="bg-card border border-border rounded-xl overflow-hidden"
        data-ocid="dashboard.at_risk_students.card"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Recent At-Risk Students
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Top {atRiskStudents.length} students by risk score requiring
              intervention
            </p>
          </div>
          <Link to="/students" data-ocid="dashboard.view_all_students.link">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs h-7 text-primary hover:bg-primary/10"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_1.2fr_auto_auto_1fr_auto] gap-4 px-5 py-2.5 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span>Student</span>
          <span>Program</span>
          <span>Year</span>
          <span className="text-right">Risk Score</span>
          <span>Risk Level</span>
          <span>Status</span>
        </div>

        <div
          className="divide-y divide-border"
          data-ocid="dashboard.at_risk_students.list"
        >
          {studentsLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                <div key={i} className="px-5 py-3.5 flex items-center gap-4">
                  <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-36" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))
            : atRiskStudents.length > 0
              ? atRiskStudents.map((student, idx) => (
                  <Link
                    key={student.id}
                    to="/students/$id"
                    params={{ id: String(student.id) }}
                    data-ocid={`dashboard.at_risk_students.item.${idx + 1}`}
                    className="flex md:grid md:grid-cols-[1fr_1.2fr_auto_auto_1fr_auto] items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-smooth group"
                  >
                    {/* Student */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {student.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate md:hidden">
                          {student.program}
                        </p>
                      </div>
                    </div>

                    {/* Program */}
                    <p className="hidden md:block text-sm text-muted-foreground truncate">
                      {student.program}
                    </p>

                    {/* Year */}
                    <span className="hidden md:block text-sm text-muted-foreground text-center">
                      Yr {student.year}
                    </span>

                    {/* Risk Score */}
                    <div className="hidden md:flex items-center justify-end">
                      <span
                        className={`text-sm font-bold tabular-nums ${
                          student.riskLevel === "critical"
                            ? "text-red-400"
                            : student.riskLevel === "high"
                              ? "text-orange-400"
                              : student.riskLevel === "medium"
                                ? "text-yellow-400"
                                : "text-green-400"
                        }`}
                      >
                        {student.riskScore}%
                      </span>
                    </div>

                    {/* Risk Level Badge */}
                    <div className="flex items-center">
                      <RiskBadge level={student.riskLevel} size="sm" />
                    </div>

                    {/* Status */}
                    <div className="hidden md:flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          student.status === "atRisk"
                            ? "bg-orange-400"
                            : student.status === "active"
                              ? "bg-green-400"
                              : "bg-red-400"
                        }`}
                      />
                      <span className="text-xs text-muted-foreground capitalize">
                        {student.status === "atRisk"
                          ? "At Risk"
                          : student.status}
                      </span>
                    </div>
                  </Link>
                ))
              : !studentsLoading && (
                  <div
                    data-ocid="dashboard.at_risk_students.empty_state"
                    className="px-5 py-12 text-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground mb-1">
                      No high-risk students detected
                    </p>
                    <p className="text-xs text-muted-foreground">
                      All students are currently within safe risk thresholds.
                    </p>
                  </div>
                )}
        </div>
      </div>
    </div>
  );
}
