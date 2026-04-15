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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAdvisorStats,
  useCreateIntervention,
  useInterventions,
  useUpdateIntervention,
} from "@/hooks/useInterventions";
import { useStudents } from "@/hooks/useStudents";
import { InterventionStatus, InterventionType } from "@/types";
import type { Intervention } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  HelpCircle,
  Plus,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────

type StatusFilter = "all" | "pending" | "active" | "resolved";

// ─── Constants ─────────────────────────────────────────────────────────────

const INTERVENTION_TYPE_META: Record<
  string,
  { label: string; icon: typeof BookOpen; color: string }
> = {
  [InterventionType.academicCounseling]: {
    label: "Academic Counseling",
    icon: GraduationCap,
    color: "text-primary",
  },
  [InterventionType.attendanceWarning]: {
    label: "Attendance Warning",
    icon: AlertTriangle,
    color: "text-yellow-400",
  },
  [InterventionType.financialAid]: {
    label: "Financial Aid",
    icon: DollarSign,
    color: "text-green-400",
  },
  [InterventionType.mentalHealthSupport]: {
    label: "Mental Health Support",
    icon: BrainCircuit,
    color: "text-purple-400",
  },
  [InterventionType.peerTutoring]: {
    label: "Peer Tutoring",
    icon: Users,
    color: "text-blue-400",
  },
  [InterventionType.facultyMeeting]: {
    label: "Faculty Meeting",
    icon: BookOpen,
    color: "text-orange-400",
  },
  [InterventionType.other]: {
    label: "Other",
    icon: HelpCircle,
    color: "text-muted-foreground",
  },
};

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "resolved", label: "Resolved" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function shortPrincipal(id: string): string {
  if (id.length <= 12) return id;
  return `${id.slice(0, 6)}…${id.slice(-4)}`;
}

function formatDate(ts: number): string {
  return new Date(ts / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Sub-components ────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  loading,
}: {
  label: string;
  value: number | undefined;
  icon: typeof Clock;
  accent: string;
  loading: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        {loading ? (
          <Skeleton className="h-7 w-12 mb-1" />
        ) : (
          <p className="text-2xl font-display font-bold text-foreground">
            {value ?? 0}
          </p>
        )}
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Intervention["status"] }) {
  const map: Record<
    Intervention["status"],
    { label: string; className: string }
  > = {
    pending: {
      label: "Pending",
      className: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    },
    active: {
      label: "Active",
      className: "text-primary bg-primary/10 border-primary/20",
    },
    resolved: {
      label: "Resolved",
      className: "text-green-400 bg-green-500/10 border-green-500/20",
    },
  };
  const cfg = map[status];
  return (
    <Badge variant="outline" className={`text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </Badge>
  );
}

function InterventionCard({
  intervention,
  idx,
  studentName,
  studentRisk,
  onActivate,
  onResolve,
  isPending: mutPending,
}: {
  intervention: Intervention;
  idx: number;
  studentName?: string;
  studentRisk?: string;
  onActivate: (id: number) => void;
  onResolve: (id: number) => void;
  isPending: boolean;
}) {
  const meta =
    INTERVENTION_TYPE_META[intervention.interventionType] ??
    INTERVENTION_TYPE_META[InterventionType.other];
  const TypeIcon = meta.icon;

  return (
    <div
      data-ocid={`interventions.item.${idx}`}
      className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row gap-4 hover:border-border/80 transition-smooth group"
    >
      {/* Left accent bar */}
      <div
        className={`hidden sm:block w-1 rounded-full flex-shrink-0 self-stretch min-h-[3rem] ${
          intervention.status === "resolved"
            ? "bg-green-500/50"
            : intervention.status === "active"
              ? "bg-primary/70"
              : "bg-yellow-500/50"
        }`}
      />

      {/* Body */}
      <div className="flex-1 min-w-0 space-y-3">
        {/* Row 1: student + status */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="text-sm font-semibold text-foreground truncate">
              {studentName ?? `Student #${intervention.studentId}`}
            </span>
            {studentRisk && (
              <RiskBadge
                level={studentRisk as "critical" | "high" | "medium" | "low"}
                size="sm"
              />
            )}
          </div>
          <StatusBadge status={intervention.status} />
        </div>

        {/* Row 2: type chip + dates */}
        <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border font-medium ${meta.color}`}
          >
            <TypeIcon className="w-3.5 h-3.5" />
            {meta.label}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Created {formatDate(intervention.createdAt)}
          </span>
          {intervention.resolvedAt && (
            <span className="flex items-center gap-1 text-green-400">
              <CheckCircle2 className="w-3 h-3" />
              Resolved {formatDate(intervention.resolvedAt)}
            </span>
          )}
        </div>

        {/* Row 3: description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {intervention.description}
        </p>

        {/* Row 4: advisor + actions */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs text-muted-foreground font-mono">
            Advisor: {shortPrincipal(intervention.advisorId)}
          </span>
          <div className="flex gap-2">
            {intervention.status === "pending" && (
              <Button
                type="button"
                data-ocid={`interventions.activate.${idx}`}
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60"
                onClick={() => onActivate(intervention.id)}
                disabled={mutPending}
              >
                <Activity className="w-3.5 h-3.5" />
                Mark Active
              </Button>
            )}
            {intervention.status === "active" && (
              <Button
                type="button"
                data-ocid={`interventions.resolve.${idx}`}
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1.5 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/60"
                onClick={() => onResolve(intervention.id)}
                disabled={mutPending}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark Resolved
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── New Intervention Modal ────────────────────────────────────────────────

function NewInterventionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: students } = useStudents();
  const createIntervention = useCreateIntervention();
  const { identity } = useInternetIdentity();

  const [studentId, setStudentId] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setStudentId("");
    setType("");
    setDescription("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!studentId || !type || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!identity) {
      toast.error("Not authenticated");
      return;
    }

    try {
      await createIntervention.mutateAsync({
        studentId: BigInt(studentId),
        interventionType: type as InterventionType,
        description: description.trim(),
        advisorId: identity.getPrincipal(),
      });
      toast.success("Intervention created successfully");
      handleClose();
    } catch {
      toast.error("Failed to create intervention");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="interventions.dialog"
        className="bg-card border-border max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg text-foreground">
            New Intervention
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Student selector */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">
              Student
            </Label>
            <Select value={studentId} onValueChange={setStudentId}>
              <SelectTrigger
                data-ocid="interventions.student_select"
                className="bg-background border-input"
              >
                <SelectValue placeholder="Select a student…" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {(students ?? []).map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    <span className="flex items-center gap-2">
                      {s.name}
                      <span className="text-xs text-muted-foreground">
                        · {s.program}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Intervention type */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">
              Intervention Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger
                data-ocid="interventions.type_select"
                className="bg-background border-input"
              >
                <SelectValue placeholder="Select type…" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {Object.entries(INTERVENTION_TYPE_META).map(([val, meta]) => {
                  const Icon = meta.icon;
                  return (
                    <SelectItem key={val} value={val}>
                      <span className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${meta.color}`} />
                        {meta.label}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">
              Description
            </Label>
            <Textarea
              data-ocid="interventions.description_textarea"
              placeholder="Describe the intervention plan, goals, and next steps…"
              className="bg-background border-input min-h-[100px] resize-none text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              data-ocid="interventions.cancel_button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={createIntervention.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="interventions.submit_button"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
              onClick={handleSubmit}
              disabled={createIntervention.isPending}
            >
              {createIntervention.isPending ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border border-primary-foreground/60 border-t-transparent rounded-full animate-spin" />
                  Creating…
                </span>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Create Intervention
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function InterventionsPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <InterventionsContent />
      </Layout>
    </ProtectedRoute>
  );
}

function InterventionsContent() {
  const { data: interventions, isLoading } = useInterventions();
  const { data: students } = useStudents();
  const { data: stats, isLoading: statsLoading } = useAdvisorStats();
  const updateIntervention = useUpdateIntervention();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const studentMap = new Map(students?.map((s) => [s.id, s]) ?? []);

  const filtered = (interventions ?? []).filter((i: Intervention) =>
    statusFilter === "all" ? true : i.status === statusFilter,
  );

  const totalCount = interventions?.length ?? 0;
  const pendingCount =
    interventions?.filter((i) => i.status === "pending").length ?? 0;
  const activeCount =
    stats?.activeInterventions ??
    interventions?.filter((i) => i.status === "active").length ??
    0;
  const resolvedCount =
    stats?.resolvedInterventions ??
    interventions?.filter((i) => i.status === "resolved").length ??
    0;

  const handleActivate = async (id: number) => {
    try {
      await updateIntervention.mutateAsync({
        id,
        update: { status: InterventionStatus.active },
      });
      toast.success("Intervention marked as active");
    } catch {
      toast.error("Failed to update intervention");
    }
  };

  const handleResolve = async (id: number) => {
    try {
      await updateIntervention.mutateAsync({
        id,
        update: {
          status: InterventionStatus.resolved,
          resolvedAt: BigInt(Date.now()) * BigInt(1_000_000),
        },
      });
      toast.success("Intervention marked as resolved");
    } catch {
      toast.error("Failed to update intervention");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Interventions
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track and manage academic support interventions for at-risk students
          </p>
        </div>
        <Button
          type="button"
          data-ocid="interventions.open_modal_button"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          New Intervention
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Interventions"
          value={totalCount}
          icon={Activity}
          accent="bg-primary/10 text-primary"
          loading={isLoading}
        />
        <StatCard
          label="Active"
          value={activeCount}
          icon={Activity}
          accent="bg-primary/10 text-primary"
          loading={statsLoading && isLoading}
        />
        <StatCard
          label="Pending"
          value={pendingCount}
          icon={Clock}
          accent="bg-yellow-500/10 text-yellow-400"
          loading={isLoading}
        />
        <StatCard
          label="Resolved"
          value={resolvedCount}
          icon={CheckCircle2}
          accent="bg-green-500/10 text-green-400"
          loading={statsLoading && isLoading}
        />
      </div>

      {/* Filter tabs */}
      <div
        data-ocid="interventions.filter.tab"
        className="flex items-center gap-1 bg-card border border-border rounded-lg p-1 w-fit"
      >
        {STATUS_FILTERS.map((opt) => {
          const count =
            opt.value === "all"
              ? totalCount
              : opt.value === "pending"
                ? pendingCount
                : opt.value === "active"
                  ? activeCount
                  : resolvedCount;
          return (
            <button
              type="button"
              key={opt.value}
              data-ocid={`interventions.filter.${opt.value}`}
              onClick={() => setStatusFilter(opt.value)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium transition-smooth ${
                statusFilter === opt.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                  statusFilter === opt.value
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interventions list */}
      <div className="space-y-3" data-ocid="interventions.list">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <Skeleton key={i} className="h-[130px] rounded-xl" />
          ))
        ) : filtered.length === 0 ? (
          <div
            data-ocid="interventions.empty_state"
            className="bg-card border border-border rounded-xl px-6 py-14 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground mb-1">
              No interventions found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {statusFilter !== "all"
                ? `No ${statusFilter} interventions available.`
                : "Create your first intervention to get started."}
            </p>
            {statusFilter === "all" && (
              <Button
                type="button"
                data-ocid="interventions.empty_create_button"
                size="sm"
                className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setModalOpen(true)}
              >
                <Plus className="w-3.5 h-3.5" />
                New Intervention
              </Button>
            )}
          </div>
        ) : (
          filtered.map((intervention, idx) => {
            const student = studentMap.get(intervention.studentId);
            return (
              <InterventionCard
                key={intervention.id}
                intervention={intervention}
                idx={idx + 1}
                studentName={student?.name}
                studentRisk={student?.riskLevel}
                onActivate={handleActivate}
                onResolve={handleResolve}
                isPending={updateIntervention.isPending}
              />
            );
          })
        )}
      </div>

      {/* New Intervention Modal */}
      <NewInterventionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
