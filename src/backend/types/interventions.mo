import Common "common";

module {
  public type InterventionId = Common.InterventionId;
  public type StudentId = Common.StudentId;
  public type AdvisorId = Common.AdvisorId;
  public type Timestamp = Common.Timestamp;

  public type InterventionType = {
    #academicCounseling;
    #attendanceWarning;
    #financialAid;
    #mentalHealthSupport;
    #peerTutoring;
    #facultyMeeting;
    #other;
  };

  public type InterventionStatus = {
    #pending;
    #active;
    #resolved;
  };

  public type Intervention = {
    id : InterventionId;
    studentId : StudentId;
    advisorId : AdvisorId;
    interventionType : InterventionType;
    description : Text;
    status : InterventionStatus;
    createdAt : Timestamp;
    resolvedAt : ?Timestamp;
  };

  public type InterventionCreate = {
    studentId : StudentId;
    advisorId : AdvisorId;
    interventionType : InterventionType;
    description : Text;
  };

  public type InterventionUpdate = {
    status : InterventionStatus;
    resolvedAt : ?Timestamp;
  };

  public type AdvisorStats = {
    totalStudents : Nat;
    atRiskStudents : Nat;
    activeInterventions : Nat;
    resolvedInterventions : Nat;
    criticalStudents : Nat;
  };
};
