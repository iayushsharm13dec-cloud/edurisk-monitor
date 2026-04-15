import type {
  AdvisorStats as BackendAdvisorStats,
  DropoutRisk as BackendDropoutRisk,
  EngagementMetric as BackendEngagementMetric,
  Intervention as BackendIntervention,
  RiskDistribution as BackendRiskDistribution,
  Student as BackendStudent,
  StudentDetail as BackendStudentDetail,
  StudentSummary as BackendStudentSummary,
  TrendPoint as BackendTrendPoint,
} from "../backend";

export type { InterventionCreate, InterventionUpdate } from "../backend";

export {
  InterventionStatus,
  InterventionType,
  RiskLevel,
  StudentStatus,
} from "../backend";

// Normalized frontend types (bigint → number conversions)
export interface StudentSummary {
  id: number;
  name: string;
  email: string;
  program: string;
  year: number;
  enrollmentDate: number;
  status: "active" | "atRisk" | "droppedOut";
  riskScore: number;
  riskLevel: "critical" | "high" | "medium" | "low";
}

export interface Student {
  id: number;
  name: string;
  email: string;
  program: string;
  year: number;
  enrollmentDate: number;
  status: "active" | "atRisk" | "droppedOut";
}

export interface AttendanceRecord {
  studentId: number;
  totalClasses: number;
  attended: number;
  percentage: number;
}

export interface AcademicPerformance {
  studentId: number;
  gpa: number;
  semester: string;
  grades: Array<{ courseName: string; grade: number }>;
}

export interface EngagementMetric {
  studentId: number;
  lmsLoginFrequency: number;
  libraryVisits: number;
  officeHoursAttended: number;
  extracurricularsCount: number;
}

export interface RiskFactor {
  name: string;
  description: string;
  value: number;
  weight: number;
}

export interface DropoutRisk {
  studentId: number;
  riskScore: number;
  riskLevel: "critical" | "high" | "medium" | "low";
  predictedAt: number;
  factors: RiskFactor[];
}

export interface StudentDetail {
  student: Student;
  attendance?: AttendanceRecord;
  performance?: AcademicPerformance;
  engagement?: EngagementMetric;
  risk?: DropoutRisk;
}

export interface Intervention {
  id: number;
  studentId: number;
  advisorId: string;
  interventionType: string;
  description: string;
  status: "pending" | "active" | "resolved";
  createdAt: number;
  resolvedAt?: number;
}

export interface AdvisorStats {
  totalStudents: number;
  atRiskStudents: number;
  criticalStudents: number;
  activeInterventions: number;
  resolvedInterventions: number;
}

export interface RiskDistribution {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface TrendPoint {
  periodLabel: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

// Normalizer helpers
export function normalizeStudentSummary(
  s: BackendStudentSummary,
): StudentSummary {
  return {
    id: Number(s.id),
    name: s.name,
    email: s.email,
    program: s.program,
    year: Number(s.year),
    enrollmentDate: Number(s.enrollmentDate),
    status: s.status as StudentSummary["status"],
    riskScore: Number(s.riskScore),
    riskLevel: s.riskLevel as StudentSummary["riskLevel"],
  };
}

export function normalizeStudent(s: BackendStudent): Student {
  return {
    id: Number(s.id),
    name: s.name,
    email: s.email,
    program: s.program,
    year: Number(s.year),
    enrollmentDate: Number(s.enrollmentDate),
    status: s.status as Student["status"],
  };
}

export function normalizeStudentDetail(d: BackendStudentDetail): StudentDetail {
  return {
    student: normalizeStudent(d.student),
    attendance: d.attendance
      ? {
          studentId: Number(d.attendance.studentId),
          totalClasses: Number(d.attendance.totalClasses),
          attended: Number(d.attendance.attended),
          percentage: d.attendance.percentage,
        }
      : undefined,
    performance: d.performance
      ? {
          studentId: Number(d.performance.studentId),
          gpa: d.performance.gpa,
          semester: d.performance.semester,
          grades: d.performance.grades,
        }
      : undefined,
    engagement: d.engagement
      ? {
          studentId: Number(d.engagement.studentId),
          lmsLoginFrequency: Number(d.engagement.lmsLoginFrequency),
          libraryVisits: Number(d.engagement.libraryVisits),
          officeHoursAttended: Number(d.engagement.officeHoursAttended),
          extracurricularsCount: Number(d.engagement.extracurricularsCount),
        }
      : undefined,
    risk: d.risk
      ? {
          studentId: Number(d.risk.studentId),
          riskScore: Number(d.risk.riskScore),
          riskLevel: d.risk.riskLevel as DropoutRisk["riskLevel"],
          predictedAt: Number(d.risk.predictedAt),
          factors: d.risk.factors,
        }
      : undefined,
  };
}

export function normalizeIntervention(i: BackendIntervention): Intervention {
  return {
    id: Number(i.id),
    studentId: Number(i.studentId),
    advisorId: i.advisorId.toString(),
    interventionType: i.interventionType,
    description: i.description,
    status: i.status as Intervention["status"],
    createdAt: Number(i.createdAt),
    resolvedAt: i.resolvedAt != null ? Number(i.resolvedAt) : undefined,
  };
}

export function normalizeAdvisorStats(s: BackendAdvisorStats): AdvisorStats {
  return {
    totalStudents: Number(s.totalStudents),
    atRiskStudents: Number(s.atRiskStudents),
    criticalStudents: Number(s.criticalStudents),
    activeInterventions: Number(s.activeInterventions),
    resolvedInterventions: Number(s.resolvedInterventions),
  };
}

export function normalizeRiskDistribution(
  r: BackendRiskDistribution,
): RiskDistribution {
  return {
    critical: Number(r.critical),
    high: Number(r.high),
    medium: Number(r.medium),
    low: Number(r.low),
  };
}

export function normalizeTrendPoint(t: BackendTrendPoint): TrendPoint {
  return {
    periodLabel: t.periodLabel,
    critical: Number(t.critical),
    high: Number(t.high),
    medium: Number(t.medium),
    low: Number(t.low),
  };
}
