import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RiskBadge } from "@/components/RiskBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudents } from "@/hooks/useStudents";
import type { StudentSummary } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpDown,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type RiskFilter = "all" | "critical" | "high" | "medium" | "low";
type SortKey = "riskScore" | "name" | "program";

const filterConfig: { key: RiskFilter; label: string; dotColor: string }[] = [
  { key: "all", label: "All Students", dotColor: "bg-muted-foreground" },
  { key: "critical", label: "Critical", dotColor: "bg-red-500" },
  { key: "high", label: "High", dotColor: "bg-orange-500" },
  { key: "medium", label: "Medium", dotColor: "bg-yellow-500" },
  { key: "low", label: "Low", dotColor: "bg-green-500" },
];

const riskBarColor: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "text-green-400 bg-green-500/10" },
  atRisk: { label: "At Risk", className: "text-orange-400 bg-orange-500/10" },
  droppedOut: { label: "Dropped Out", className: "text-red-400 bg-red-500/10" },
};

function SummaryBar({ students }: { students: StudentSummary[] }) {
  const counts = useMemo(
    () =>
      students.reduce(
        (acc, s) => {
          acc[s.riskLevel] = (acc[s.riskLevel] ?? 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
    [students],
  );

  const items = [
    {
      key: "critical",
      label: "Critical Risk",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
      icon: "bg-red-500",
    },
    {
      key: "high",
      label: "High Risk",
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
      icon: "bg-orange-500",
    },
    {
      key: "medium",
      label: "Medium Risk",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/20",
      icon: "bg-yellow-500",
    },
    {
      key: "low",
      label: "Low Risk",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
      icon: "bg-green-500",
    },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
      data-ocid="students.summary_bar"
    >
      {items.map((item) => (
        <div
          key={item.key}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${item.bg}`}
        >
          <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
          <div>
            <p
              className={`text-2xl font-bold font-display leading-none ${item.color}`}
            >
              {counts[item.key] ?? 0}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StudentRow({
  student,
  index,
}: { student: StudentSummary; index: number }) {
  const statusCfg = statusConfig[student.status] ?? statusConfig.active;
  return (
    <Link
      to="/students/$id"
      params={{ id: String(student.id) }}
      data-ocid={`students.item.${index + 1}`}
      className="flex items-center gap-4 px-4 py-3.5 border-b border-border hover:bg-card/80 transition-smooth group cursor-pointer"
    >
      <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary font-display">
        {student.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {student.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {student.email}
        </p>
      </div>

      <div className="hidden md:block w-44 min-w-0">
        <p className="text-xs font-medium text-foreground/80 truncate">
          {student.program}
        </p>
        <p className="text-xs text-muted-foreground">Year {student.year}</p>
      </div>

      <div className="hidden sm:flex flex-col gap-1 w-28">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Score
          </span>
          <span
            className={`text-xs font-bold font-mono ${riskBarColor[student.riskLevel].replace("bg-", "text-")}`}
          >
            {student.riskScore}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-smooth ${riskBarColor[student.riskLevel]}`}
            style={{ width: `${student.riskScore}%` }}
          />
        </div>
      </div>

      <div className="hidden sm:block w-20">
        <RiskBadge level={student.riskLevel} />
      </div>

      <div className="hidden lg:block w-20">
        <span
          className={`inline-flex items-center text-[11px] px-2 py-0.5 rounded-full font-medium ${statusCfg.className}`}
        >
          {statusCfg.label}
        </span>
      </div>

      <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
        <span className="text-xs text-primary hidden sm:block">Profile</span>
        <ArrowRight className="w-4 h-4 text-primary" />
      </div>
    </Link>
  );
}

function StudentsContent() {
  const { data: students = [], isLoading } = useStudents();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RiskFilter>("all");
  const [sort, setSort] = useState<SortKey>("riskScore");
  const [sortAsc, setSortAsc] = useState(false);

  const toggleSort = (key: SortKey) => {
    if (sort === key) setSortAsc((v) => !v);
    else {
      setSort(key);
      setSortAsc(false);
    }
  };

  const filtered = useMemo(() => {
    let list = [...students];
    if (filter !== "all") list = list.filter((s) => s.riskLevel === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.program.toLowerCase().includes(q),
      );
    }
    list.sort((a: StudentSummary, b: StudentSummary) => {
      let diff = 0;
      if (sort === "riskScore") diff = a.riskScore - b.riskScore;
      else if (sort === "name") diff = a.name.localeCompare(b.name);
      else diff = a.program.localeCompare(b.program);
      return sortAsc ? diff : -diff;
    });
    return list;
  }, [students, filter, search, sort, sortAsc]);

  return (
    <div className="p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Student Risk List
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor at-risk students ·{" "}
            {isLoading ? "Loading…" : `${students.length} total enrolled`}
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-primary/30 text-primary bg-primary/10 font-mono text-sm px-3 py-1 hidden sm:flex"
        >
          {isLoading ? "—" : `${students.length} students`}
        </Badge>
      </div>

      {/* Summary Bar */}
      {!isLoading && students.length > 0 && <SummaryBar students={students} />}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search by name, email, or program…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border text-sm"
            data-ocid="students.search_input"
          />
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-sm bg-card border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid="students.sort.select"
          >
            <option value="riskScore">Sort: Risk Score</option>
            <option value="name">Sort: Name</option>
            <option value="program">Sort: Program</option>
          </select>
        </div>
      </div>

      {/* Risk Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4" aria-label="Risk level filter">
        {filterConfig.map((f) => {
          const isActive = filter === f.key;
          const count =
            f.key === "all"
              ? students.length
              : students.filter((s) => s.riskLevel === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              data-ocid={`students.filter.${f.key}`}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth ${isActive ? "bg-card border-primary/40 text-primary shadow-sm" : "border-border text-muted-foreground hover:text-foreground bg-transparent"}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.dotColor}`}
              />
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono leading-none ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Students Table */}
      <div
        className="rounded-lg border border-border bg-card overflow-hidden"
        data-ocid="students.list"
      >
        {/* Header Row */}
        <div className="hidden sm:flex items-center gap-4 px-4 py-2.5 bg-muted/40 border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          <div className="w-9 flex-shrink-0" />
          <div className="flex-1">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-foreground transition-smooth"
              onClick={() => toggleSort("name")}
            >
              Student <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
          <div className="hidden md:block w-44">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-foreground transition-smooth"
              onClick={() => toggleSort("program")}
            >
              Program <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
          <div className="hidden sm:block w-28">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-foreground transition-smooth"
              onClick={() => toggleSort("riskScore")}
            >
              Risk Score <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
          <div className="hidden sm:block w-20">Level</div>
          <div className="hidden lg:block w-20">Status</div>
          <div className="w-16 text-right">View</div>
        </div>

        {isLoading ? (
          <div data-ocid="students.loading_state">
            {[
              "sk1",
              "sk2",
              "sk3",
              "sk4",
              "sk5",
              "sk6",
              "sk7",
              "sk8",
              "sk9",
              "sk10",
            ].map((sk) => (
              <div
                key={sk}
                className="flex items-center gap-4 px-4 py-3.5 border-b border-border"
              >
                <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-36" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="hidden md:block h-3 w-32" />
                <Skeleton className="hidden sm:block h-3 w-24" />
                <Skeleton className="hidden sm:block h-5 w-16 rounded-full" />
                <Skeleton className="hidden lg:block h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-4 rounded" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="students.empty_state"
          >
            <Search className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <p className="text-foreground font-semibold">No students found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {search
                ? "Try a different search query."
                : "Adjust your filters."}
            </p>
            {search && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => setSearch("")}
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          filtered.map((student, i) => (
            <StudentRow key={student.id} student={student} index={i} />
          ))
        )}
      </div>

      {!isLoading && filtered.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3 text-right">
          Showing {filtered.length} of {students.length} students
        </p>
      )}
    </div>
  );
}

export default function StudentsPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <StudentsContent />
      </Layout>
    </ProtectedRoute>
  );
}
