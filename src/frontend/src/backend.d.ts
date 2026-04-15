import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Intervention {
    id: InterventionId;
    status: InterventionStatus;
    studentId: StudentId;
    createdAt: Timestamp;
    description: string;
    interventionType: InterventionType;
    advisorId: AdvisorId;
    resolvedAt?: Timestamp;
}
export type Timestamp = bigint;
export interface EngagementMetric {
    studentId: StudentId;
    extracurricularsCount: bigint;
    lmsLoginFrequency: bigint;
    officeHoursAttended: bigint;
    libraryVisits: bigint;
}
export interface InterventionCreate {
    studentId: StudentId;
    description: string;
    interventionType: InterventionType;
    advisorId: AdvisorId;
}
export interface CourseGrade {
    grade: number;
    courseName: string;
}
export interface AttendanceRecord {
    totalClasses: bigint;
    studentId: StudentId;
    attended: bigint;
    percentage: number;
}
export interface AdvisorStats {
    totalStudents: bigint;
    criticalStudents: bigint;
    activeInterventions: bigint;
    resolvedInterventions: bigint;
    atRiskStudents: bigint;
}
export interface AcademicPerformance {
    gpa: number;
    grades: Array<CourseGrade>;
    studentId: StudentId;
    semester: string;
}
export type AdvisorId = Principal;
export interface DropoutRisk {
    studentId: StudentId;
    predictedAt: Timestamp;
    factors: Array<RiskFactor>;
    riskLevel: RiskLevel;
    riskScore: bigint;
}
export type StudentId = bigint;
export interface RiskFactor {
    weight: number;
    value: number;
    name: string;
    description: string;
}
export interface StudentDetail {
    risk?: DropoutRisk;
    attendance?: AttendanceRecord;
    performance?: AcademicPerformance;
    student: Student;
    engagement?: EngagementMetric;
}
export interface InterventionUpdate {
    status: InterventionStatus;
    resolvedAt?: Timestamp;
}
export interface RiskDistribution {
    low: bigint;
    high: bigint;
    critical: bigint;
    medium: bigint;
}
export type InterventionId = bigint;
export interface TrendPoint {
    low: bigint;
    high: bigint;
    periodLabel: string;
    critical: bigint;
    medium: bigint;
}
export interface StudentSummary {
    id: StudentId;
    status: StudentStatus;
    name: string;
    year: bigint;
    email: string;
    enrollmentDate: Timestamp;
    riskLevel: RiskLevel;
    riskScore: bigint;
    program: string;
}
export interface Student {
    id: StudentId;
    status: StudentStatus;
    name: string;
    year: bigint;
    email: string;
    enrollmentDate: Timestamp;
    program: string;
}
export enum InterventionStatus {
    resolved = "resolved",
    active = "active",
    pending = "pending"
}
export enum InterventionType {
    other = "other",
    attendanceWarning = "attendanceWarning",
    financialAid = "financialAid",
    facultyMeeting = "facultyMeeting",
    peerTutoring = "peerTutoring",
    academicCounseling = "academicCounseling",
    mentalHealthSupport = "mentalHealthSupport"
}
export enum RiskLevel {
    low = "low",
    high = "high",
    critical = "critical",
    medium = "medium"
}
export enum StudentStatus {
    active = "active",
    droppedOut = "droppedOut",
    atRisk = "atRisk"
}
export interface backendInterface {
    createIntervention(payload: InterventionCreate): Promise<Intervention>;
    getAdvisorStats(): Promise<AdvisorStats>;
    getInterventions(): Promise<Array<Intervention>>;
    getRiskDistribution(): Promise<RiskDistribution>;
    getRiskTrend(): Promise<Array<TrendPoint>>;
    getStudent(id: StudentId): Promise<StudentDetail | null>;
    getStudentInterventions(studentId: StudentId): Promise<Array<Intervention>>;
    getStudents(): Promise<Array<StudentSummary>>;
    seedSampleData(): Promise<void>;
    updateIntervention(id: InterventionId, update: InterventionUpdate): Promise<Intervention | null>;
}
