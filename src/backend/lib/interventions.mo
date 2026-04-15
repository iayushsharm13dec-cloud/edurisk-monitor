import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/interventions";
import StudentTypes "../types/students";
import Common "../types/common";

module {
  public type State = {
    interventions : List.List<Types.Intervention>;
    nextId : { var value : Nat };
  };

  public func newState() : State {
    {
      interventions = List.empty<Types.Intervention>();
      nextId = { var value = 1 };
    };
  };

  public func listInterventions(state : State) : [Types.Intervention] {
    state.interventions.toArray();
  };

  public func getStudentInterventions(state : State, studentId : Common.StudentId) : [Types.Intervention] {
    let filtered = state.interventions.filter<Types.Intervention>(func(i : Types.Intervention) { i.studentId == studentId });
    filtered.toArray();
  };

  public func createIntervention(state : State, payload : Types.InterventionCreate) : Types.Intervention {
    let id = state.nextId.value;
    state.nextId.value += 1;
    let intervention : Types.Intervention = {
      id;
      studentId = payload.studentId;
      advisorId = payload.advisorId;
      interventionType = payload.interventionType;
      description = payload.description;
      status = #pending;
      createdAt = Time.now();
      resolvedAt = null;
    };
    state.interventions.add(intervention);
    intervention;
  };

  public func updateIntervention(state : State, id : Common.InterventionId, update : Types.InterventionUpdate) : ?Types.Intervention {
    var updated : ?Types.Intervention = null;
    state.interventions.mapInPlace<Types.Intervention>(func(i : Types.Intervention) : Types.Intervention {
      if (i.id == id) {
        let newIntervention = { i with status = update.status; resolvedAt = update.resolvedAt };
        updated := ?newIntervention;
        newIntervention;
      } else i;
    });
    updated;
  };

  public func getAdvisorStats(
    state : State,
    distribution : StudentTypes.RiskDistribution,
  ) : Types.AdvisorStats {
    let _allInterventions = state.interventions.toArray();
    let active = state.interventions.filter<Types.Intervention>(func(i : Types.Intervention) { i.status == #active or i.status == #pending });
    let resolved = state.interventions.filter<Types.Intervention>(func(i : Types.Intervention) { i.status == #resolved });
    let totalStudents = distribution.critical + distribution.high + distribution.medium + distribution.low;
    {
      totalStudents;
      atRiskStudents = distribution.critical + distribution.high;
      activeInterventions = active.size();
      resolvedInterventions = resolved.size();
      criticalStudents = distribution.critical;
    };
  };

  public func seedSampleInterventions(
    state : State,
    advisorId : Common.AdvisorId,
  ) : () {
    if (state.interventions.size() > 0) return;

    // Seed 12 interventions for the high-risk and critical students (IDs 1-16)
    let seeds : [(Common.StudentId, Types.InterventionType, Text, Types.InterventionStatus, ?Common.Timestamp)] = [
      (1, #attendanceWarning, "Student has missed over 69% of classes. Immediate attendance counseling required.", #active, null),
      (2, #academicCounseling, "GPA has dropped below 1.0. Academic improvement plan initiated.", #active, null),
      (3, #mentalHealthSupport, "Student referred to campus counseling center due to extended absences.", #pending, null),
      (4, #facultyMeeting, "Faculty meeting scheduled to discuss academic performance and support options.", #active, null),
      (5, #academicCounseling, "Senior student at risk of not graduating. Emergency advising session arranged.", #resolved, ?(Time.now())),
      (6, #peerTutoring, "Peer tutoring program enrollment arranged for struggling first-year student.", #active, null),
      (7, #attendanceWarning, "Attendance dropped below 55% in semester. Warning letter sent and meeting scheduled.", #resolved, ?(Time.now())),
      (8, #financialAid, "Student flagged potential financial hardship affecting attendance. Financial aid review initiated.", #pending, null),
      (9, #academicCounseling, "GPA of 1.9 requires immediate academic counseling before end of term.", #active, null),
      (10, #peerTutoring, "Assigned to peer tutoring group for core Computer Science modules.", #active, null),
      (11, #mentalHealthSupport, "First-year student showing signs of stress. Wellness check and counseling arranged.", #pending, null),
      (12, #facultyMeeting, "Engineering faculty meeting to discuss student's performance trajectory.", #resolved, ?(Time.now())),
    ];

    for ((studentId, iType, desc, status, resolvedAt) in seeds.values()) {
      let id = state.nextId.value;
      state.nextId.value += 1;
      let intervention : Types.Intervention = {
        id;
        studentId;
        advisorId;
        interventionType = iType;
        description = desc;
        status;
        createdAt = Time.now();
        resolvedAt;
      };
      state.interventions.add(intervention);
    };
  };
};
