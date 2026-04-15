import Common "common";

module {
  public type StudentId = Common.StudentId;
  public type Timestamp = Common.Timestamp;

  public type StudentStatus = {
    #active;
    #atRisk;
    #droppedOut;
  };

  public type Student = {
    id : StudentId;
    name : Text;
    email : Text;
    program : Text;
    year : Nat;
    enrollmentDate : Timestamp;
    status : StudentStatus;
  };

  public type AttendanceRecord = {
    studentId : StudentId;
    percentage : Float;
    totalClasses : Nat;
    attended : Nat;
  };

  public type CourseGrade = {
    courseName : Text;
    grade : Float;
  };

  public type AcademicPerformance = {
    studentId : StudentId;
    gpa : Float;
    semester : Text;
    grades : [CourseGrade];
  };

  public type EngagementMetric = {
    studentId : StudentId;
    libraryVisits : Nat;
    officeHoursAttended : Nat;
    extracurricularsCount : Nat;
    lmsLoginFrequency : Nat;
  };

  public type RiskLevel = {
    #critical;
    #high;
    #medium;
    #low;
  };

  public type RiskFactor = {
    name : Text;
    weight : Float;
    value : Float;
    description : Text;
  };

  public type DropoutRisk = {
    studentId : StudentId;
    riskScore : Nat;
    riskLevel : RiskLevel;
    predictedAt : Timestamp;
    factors : [RiskFactor];
  };

  // Shared public view type for API boundary
  public type StudentSummary = {
    id : StudentId;
    name : Text;
    email : Text;
    program : Text;
    year : Nat;
    enrollmentDate : Timestamp;
    status : StudentStatus;
    riskScore : Nat;
    riskLevel : RiskLevel;
  };

  public type StudentDetail = {
    student : Student;
    attendance : ?AttendanceRecord;
    performance : ?AcademicPerformance;
    engagement : ?EngagementMetric;
    risk : ?DropoutRisk;
  };

  public type RiskDistribution = {
    critical : Nat;
    high : Nat;
    medium : Nat;
    low : Nat;
  };

  public type TrendPoint = {
    periodLabel : Text;
    critical : Nat;
    high : Nat;
    medium : Nat;
    low : Nat;
  };
};
