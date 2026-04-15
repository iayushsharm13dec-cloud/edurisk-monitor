import InterventionLib "../lib/interventions";
import StudentLib "../lib/students";
import Types "../types/interventions";
import Common "../types/common";

mixin (interventionState : InterventionLib.State, studentState : StudentLib.State) {

  public query func getInterventions() : async [Types.Intervention] {
    InterventionLib.listInterventions(interventionState);
  };

  public query func getStudentInterventions(studentId : Common.StudentId) : async [Types.Intervention] {
    InterventionLib.getStudentInterventions(interventionState, studentId);
  };

  public func createIntervention(payload : Types.InterventionCreate) : async Types.Intervention {
    InterventionLib.createIntervention(interventionState, payload);
  };

  public func updateIntervention(id : Common.InterventionId, update : Types.InterventionUpdate) : async ?Types.Intervention {
    InterventionLib.updateIntervention(interventionState, id, update);
  };

  public query func getAdvisorStats() : async Types.AdvisorStats {
    let distribution = StudentLib.getRiskDistribution(studentState);
    InterventionLib.getAdvisorStats(interventionState, distribution);
  };

};
