import StudentLib "lib/students";
import InterventionLib "lib/interventions";
import StudentsMixin "mixins/students-api";
import InterventionsMixin "mixins/interventions-api";
import Principal "mo:core/Principal";

actor {
  let studentState = StudentLib.newState();
  let interventionState = InterventionLib.newState();

  include StudentsMixin(studentState);
  include InterventionsMixin(interventionState, studentState);

  // Pre-populate sample data on first deploy
  StudentLib.seedSampleData(studentState);
  InterventionLib.seedSampleInterventions(interventionState, Principal.anonymous());
};
