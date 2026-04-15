import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RiskBadge } from "@/components/RiskBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateIntervention,
  useStudentInterventions,
} from "@/hooks/useInterventions";
import { useStudent } from "@/hooks/useStudents";
import { InterventionType } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  MessageSquare,
  PlusCircle,
  ShieldAlert,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const interventionTypeOptions = Object.values(InterventionType).map((v) => ({
  value: v,
  label: v.replace(/([A-Z])/g, " $1").trim(),
}));

const interventionStatusConfig: Record<
  string,
  { label: string; icon: typeof Clock; className: string }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  active: {
    label: "Active",
    icon: Brain,
    className: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  resolved: {
    label: "Resolved",
    icon: CheckCircle2,
    className: "text-green-400 bg-green-500/10 border-green-500/20",
  },
};

const statusBadgeClass: Record<string, string> = {
  active: "text-green-400 bg-green-500/10 border-green-500/20",
  atRisk: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  droppedOut: "text-red-400 bg-red-500/10 border-red-500/20",
};
const statusLabel: Record<string, string> = {
  active: "Active",
  atRisk: "At Risk",
  droppedOut: "Dropped Out",
};

function RiskGauge({ score, level }: { score: number; level: string }) {
  const gaugeColor =
    level === "critical"
      ? "#ef4444"
      : level === "high"
        ? "#f97316"
        : level === "medium"
          ? "#eab308"
          : "#22c55e";

  const data = [{ value: score }, { value: 100 - score }];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 140, height: 140 }}
    >
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie
            data={data}
            cx={65}
            cy={65}
            innerRadius={50}
            outerRadius={65}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill={gaugeColor} />
            <Cell fill="rgba(255,255,255,0.05)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          className="text-3xl font-bold font-display leading-none"
          style={{ color: gaugeColor }}
        >
          {score}
        </span>
        <span className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">
          Risk Score
        </span>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  iconClass = "text-primary",
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string | number;
  sub?: string;
  iconClass?: string;
}) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
        <Icon className={`w-4 h-4 ${iconClass}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-xl font-bold font-display text-foreground leading-none">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function NewInterventionModal({
  open,
  onClose,
  studentId,
}: { open: boolean; onClose: () => void; studentId: number }) {
  const [type, setType] = useState(InterventionType.academicCounseling);
  const [description, setDescription] = useState("");
  const createIntervention = useCreateIntervention();
  const { identity } = useInternetIdentity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please provide a description.");
      return;
    }
    if (!identity) {
      toast.error("Not authenticated.");
      return;
    }
    try {
      await createIntervention.mutateAsync({
        studentId: BigInt(studentId),
        interventionType: type,
        description: description.trim(),
        advisorId: identity.getPrincipal(),
      });
      toast.success("Intervention created successfully.");
      setDescription("");
      setType(InterventionType.academicCounseling);
      onClose();
    } catch {
      toast.error("Failed to create intervention.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="bg-card border-border max-w-md"
        data-ocid="intervention.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-primary" />
            New Intervention
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="int-type" className="text-sm text-foreground">
              Intervention Type
            </Label>
            <select
              id="int-type"
              value={type}
              onChange={(e) => setType(e.target.value as InterventionType)}
              className="w-full text-sm bg-muted border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              data-ocid="intervention.type.select"
            >
              {interventionTypeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="int-desc" className="text-sm text-foreground">
              Description
            </Label>
            <Textarea
              id="int-desc"
              placeholder="Describe the intervention plan and expected outcomes…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-muted border-border text-foreground resize-none text-sm"
              data-ocid="intervention.description.textarea"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              data-ocid="intervention.cancel_button"
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createIntervention.isPending || !description.trim()}
              data-ocid="intervention.submit_button"
            >
              {createIntervention.isPending
                ? "Creating…"
                : "Create Intervention"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function StudentDetailContent() {
  const { id } = useParams({ from: "/students/$id" });
  const studentId = Number.parseInt(id, 10);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: detail, isLoading } = useStudent(
    Number.isNaN(studentId) ? null : studentId,
  );
  const { data: interventions = [], isLoading: interventionsLoading } =
    useStudentInterventions(Number.isNaN(studentId) ? null : studentId);

  if (isLoading) {
    return (
      <div
        className="p-4 lg:p-6 max-w-6xl mx-auto space-y-5"
        data-ocid="student_detail.loading_state"
      >
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-36 rounded-xl" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>
        <Skeleton className="h-44 rounded-lg" />
        <Skeleton className="h-52 rounded-lg" />
      </div>
    );
  }

  if (!detail) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-center"
        data-ocid="student_detail.error_state"
      >
        <ShieldAlert className="w-14 h-14 text-muted-foreground/30 mb-4" />
        <p className="text-foreground font-semibold text-lg">
          Student not found
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          This student may not exist or was removed.
        </p>
        <Link to="/students" className="mt-4 inline-block">
          <Button type="button" variant="outline" size="sm" className="gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Back to Students
          </Button>
        </Link>
      </div>
    );
  }

  const { student, attendance, performance, engagement, risk } = detail;
  const sClass = statusBadgeClass[student.status] ?? statusBadgeClass.active;
  const sLabel = statusLabel[student.status] ?? "Unknown";

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-5">
      {/* Back */}
      <Link
        to="/students"
        data-ocid="student_detail.back_button"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Students
      </Link>

      {/* Header Card */}
      <div
        className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        data-ocid="student_detail.header"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-primary font-display">
          {student.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-bold font-display text-foreground">
              {student.name}
            </h1>
            <span
              className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${sClass}`}
            >
              {sLabel}
            </span>
            {risk && <RiskBadge level={risk.riskLevel} size="md" />}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {student.email}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {student.program}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Year {student.year}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Enrolled{" "}
              {new Date(
                Number(student.enrollmentDate) / 1_000_000,
              ).toLocaleDateString()}
            </span>
          </div>
        </div>
        {risk && (
          <div className="flex-shrink-0" data-ocid="student_detail.risk_gauge">
            <RiskGauge score={risk.riskScore} level={risk.riskLevel} />
          </div>
        )}
      </div>

      {/* Metrics */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        data-ocid="student_detail.metrics"
      >
        <MetricCard
          icon={Clock}
          label="Attendance Rate"
          value={attendance ? `${attendance.percentage.toFixed(1)}%` : "N/A"}
          sub={
            attendance
              ? `${attendance.attended} / ${attendance.totalClasses} classes`
              : undefined
          }
          iconClass="text-blue-400"
        />
        <MetricCard
          icon={TrendingUp}
          label="Current GPA"
          value={performance ? performance.gpa.toFixed(2) : "N/A"}
          sub={performance ? `Semester: ${performance.semester}` : undefined}
          iconClass="text-primary"
        />
        <MetricCard
          icon={Zap}
          label="LMS Engagement"
          value={engagement ? `${engagement.lmsLoginFrequency}` : "N/A"}
          sub={
            engagement
              ? `${engagement.officeHoursAttended} office hours attended`
              : undefined
          }
          iconClass="text-purple-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Risk Factors */}
        {risk && risk.factors.length > 0 && (
          <div
            className="bg-card rounded-xl border border-border p-5"
            data-ocid="student_detail.risk_factors"
          >
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              Risk Factors
            </h2>
            <div className="space-y-4">
              {risk.factors.map((factor, i) => (
                <div
                  key={factor.name}
                  data-ocid={`student_detail.risk_factor.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {factor.name}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        Val:{" "}
                        <span className="text-foreground font-mono">
                          {factor.value.toFixed(2)}
                        </span>
                      </span>
                      <span>
                        Wt:{" "}
                        <span className="text-foreground font-mono">
                          {(factor.weight * 100).toFixed(0)}%
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-smooth"
                      style={{ width: `${Math.min(100, factor.value * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Grades */}
        {performance && performance.grades.length > 0 && (
          <div
            className="bg-card rounded-xl border border-border p-5"
            data-ocid="student_detail.performance"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                Course Grades
              </h2>
              <Badge
                variant="outline"
                className="text-xs border-border text-muted-foreground"
              >
                {performance.semester}
              </Badge>
            </div>
            <div className="space-y-2.5">
              {performance.grades.map((g, i) => {
                const pct = Math.min(100, (g.grade / 4.0) * 100);
                const barColor =
                  g.grade >= 3.0
                    ? "bg-green-500"
                    : g.grade >= 2.0
                      ? "bg-yellow-500"
                      : "bg-red-500";
                const textColor =
                  g.grade >= 3.0
                    ? "text-green-400"
                    : g.grade >= 2.0
                      ? "text-yellow-400"
                      : "text-red-400";
                return (
                  <div
                    key={g.courseName}
                    data-ocid={`student_detail.grade.${i + 1}`}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xs text-foreground flex-1 truncate min-w-0">
                      {g.courseName}
                    </span>
                    <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden flex-shrink-0">
                      <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold w-8 text-right flex-shrink-0 ${textColor}`}
                    >
                      {g.grade.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Engagement Details */}
        {engagement && (
          <div
            className="bg-card rounded-xl border border-border p-5"
            data-ocid="student_detail.engagement"
          >
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-purple-400" />
              Engagement Breakdown
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "LMS Logins / Week",
                  value: engagement.lmsLoginFrequency,
                  max: 20,
                },
                {
                  label: "Library Visits",
                  value: engagement.libraryVisits,
                  max: 10,
                },
                {
                  label: "Office Hours Attended",
                  value: engagement.officeHoursAttended,
                  max: 10,
                },
                {
                  label: "Extracurricular Activities",
                  value: engagement.extracurricularsCount,
                  max: 5,
                },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      {m.label}
                    </span>
                    <span className="text-xs font-bold font-mono text-foreground">
                      {m.value}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-purple-500/60"
                      style={{
                        width: `${Math.min(100, (m.value / m.max) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interventions */}
      <div
        className="bg-card rounded-xl border border-border p-5"
        data-ocid="student_detail.interventions"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2 text-sm">
            <MessageSquare className="w-4 h-4 text-primary" />
            Interventions
            <Badge
              variant="outline"
              className="border-border text-muted-foreground text-xs"
            >
              {interventions.length}
            </Badge>
          </h2>
          <Button
            type="button"
            size="sm"
            onClick={() => setModalOpen(true)}
            data-ocid="student_detail.new_intervention.open_modal_button"
            className="gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            New Intervention
          </Button>
        </div>

        {interventionsLoading ? (
          <div
            data-ocid="student_detail.interventions.loading_state"
            className="space-y-3"
          >
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
          </div>
        ) : interventions.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 text-center"
            data-ocid="student_detail.interventions.empty_state"
          >
            <MessageSquare className="w-10 h-10 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-foreground font-medium">
              No interventions yet
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Create the first intervention for this student.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {interventions.map((intv, i) => {
              const sc =
                interventionStatusConfig[intv.status] ??
                interventionStatusConfig.pending;
              const StatusIcon = sc.icon;
              return (
                <div
                  key={intv.id}
                  data-ocid={`student_detail.interventions.item.${i + 1}`}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${sc.className}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-foreground">
                        {intv.interventionType
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                      </span>
                      <span
                        className={`inline-flex items-center text-[11px] px-1.5 py-0.5 rounded-full border font-medium ${sc.className}`}
                      >
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {intv.description}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                      {new Date(
                        Number(intv.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <NewInterventionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        studentId={studentId}
      />
    </div>
  );
}

export default function StudentDetailPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <StudentDetailContent />
      </Layout>
    </ProtectedRoute>
  );
}
