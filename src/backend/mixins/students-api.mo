import StudentLib "../lib/students";
import Types "../types/students";
import Common "../types/common";

mixin (studentState : StudentLib.State) {

  public query func getStudents() : async [Types.StudentSummary] {
    StudentLib.listStudentSummaries(studentState);
  };

  public query func getStudent(id : Common.StudentId) : async ?Types.StudentDetail {
    StudentLib.getStudentDetail(studentState, id);
  };

  public query func getRiskDistribution() : async Types.RiskDistribution {
    StudentLib.getRiskDistribution(studentState);
  };

  public query func getRiskTrend() : async [Types.TrendPoint] {
    StudentLib.getRiskTrend(studentState);
  };

  public func seedSampleData() : async () {
    StudentLib.seedSampleData(studentState);
  };

};
