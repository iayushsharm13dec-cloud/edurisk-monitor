import List "mo:core/List";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Types "../types/students";
import Common "../types/common";

module {
  public type State = {
    students : List.List<Types.Student>;
    attendance : Map.Map<Common.StudentId, Types.AttendanceRecord>;
    performance : Map.Map<Common.StudentId, Types.AcademicPerformance>;
    engagement : Map.Map<Common.StudentId, Types.EngagementMetric>;
    nextId : { var value : Nat };
  };

  public func newState() : State {
    {
      students = List.empty<Types.Student>();
      attendance = Map.empty<Common.StudentId, Types.AttendanceRecord>();
      performance = Map.empty<Common.StudentId, Types.AcademicPerformance>();
      engagement = Map.empty<Common.StudentId, Types.EngagementMetric>();
      nextId = { var value = 1 };
    };
  };

  // Clamp a Float to [0, 100] and convert to Nat
  func floatToScore(f : Float) : Nat {
    let clamped = if (f < 0.0) 0.0 else if (f > 100.0) 100.0 else f;
    Int.abs(clamped.toInt());
  };

  // Returns (score 0-100, riskLevel, factors)
  // Weights: attendance=40%, GPA=35%, engagement=25%
  public func calculateRiskScore(
    attendanceRecord : ?Types.AttendanceRecord,
    academicPerformance : ?Types.AcademicPerformance,
    engagementMetric : ?Types.EngagementMetric,
  ) : (Nat, Types.RiskLevel, [Types.RiskFactor]) {

    // Attendance: low attendance → high risk contribution (0–40)
    let (attendanceComponent, attendanceFactor) = switch (attendanceRecord) {
      case (?rec) {
        let pct = rec.percentage;
        let component = (1.0 - pct) * 40.0;
        let desc = if (pct < 0.60) "Critically low attendance"
          else if (pct < 0.75) "Below required attendance"
          else if (pct < 0.85) "Attendance needs improvement"
          else "Attendance is satisfactory";
        let factor : Types.RiskFactor = { name = "Attendance"; weight = 0.40; value = pct; description = desc };
        (component, factor);
      };
      case null {
        let factor : Types.RiskFactor = { name = "Attendance"; weight = 0.40; value = 0.0; description = "No attendance data available" };
        (20.0, factor);
      };
    };

    // GPA: low GPA → high risk contribution (0–35)
    let (gpaComponent, gpaFactor) = switch (academicPerformance) {
      case (?perf) {
        let gpa = perf.gpa;
        let component = (1.0 - gpa / 4.0) * 35.0;
        let desc = if (gpa < 1.5) "GPA critically below passing threshold"
          else if (gpa < 2.0) "GPA below minimum requirements"
          else if (gpa < 2.5) "GPA is borderline"
          else "GPA is satisfactory";
        let factor : Types.RiskFactor = { name = "GPA"; weight = 0.35; value = gpa; description = desc };
        (component, factor);
      };
      case null {
        let factor : Types.RiskFactor = { name = "GPA"; weight = 0.35; value = 0.0; description = "No academic performance data" };
        (17.5, factor);
      };
    };

    // Engagement: low engagement → high risk contribution (0–25)
    let (engagementComponent, engagementFactor) = switch (engagementMetric) {
      case (?eng) {
        let lib = (if (eng.libraryVisits >= 8) 8 else eng.libraryVisits).toFloat() / 8.0;
        let oh = (if (eng.officeHoursAttended >= 4) 4 else eng.officeHoursAttended).toFloat() / 4.0;
        let ec = (if (eng.extracurricularsCount >= 2) 2 else eng.extracurricularsCount).toFloat() / 2.0;
        let lms = (if (eng.lmsLoginFrequency >= 12) 12 else eng.lmsLoginFrequency).toFloat() / 12.0;
        let engPct = (lib + oh + ec + lms) / 4.0;
        let component = (1.0 - engPct) * 25.0;
        let desc = if (engPct < 0.30) "Very low campus engagement"
          else if (engPct < 0.50) "Below average engagement"
          else if (engPct < 0.70) "Moderate engagement"
          else "Good campus engagement";
        let factor : Types.RiskFactor = { name = "Engagement"; weight = 0.25; value = engPct; description = desc };
        (component, factor);
      };
      case null {
        let factor : Types.RiskFactor = { name = "Engagement"; weight = 0.25; value = 0.0; description = "No engagement data available" };
        (12.5, factor);
      };
    };

    let total = attendanceComponent + gpaComponent + engagementComponent;
    let score = floatToScore(total);
    let riskLevel : Types.RiskLevel = if (score >= 70) #critical
      else if (score >= 50) #high
      else if (score >= 30) #medium
      else #low;

    (score, riskLevel, [attendanceFactor, gpaFactor, engagementFactor]);
  };

  public func computeRisk(state : State, studentId : Common.StudentId) : Types.DropoutRisk {
    let att = state.attendance.get(studentId);
    let perf = state.performance.get(studentId);
    let eng = state.engagement.get(studentId);
    let (score, level, factors) = calculateRiskScore(att, perf, eng);
    {
      studentId;
      riskScore = score;
      riskLevel = level;
      predictedAt = Time.now();
      factors;
    };
  };

  public func listStudentSummaries(state : State) : [Types.StudentSummary] {
    state.students.map<Types.Student, Types.StudentSummary>(func(s) {
      let risk = computeRisk(state, s.id);
      {
        id = s.id;
        name = s.name;
        email = s.email;
        program = s.program;
        year = s.year;
        enrollmentDate = s.enrollmentDate;
        status = s.status;
        riskScore = risk.riskScore;
        riskLevel = risk.riskLevel;
      };
    }).toArray();
  };

  public func getStudentDetail(state : State, studentId : Common.StudentId) : ?Types.StudentDetail {
    switch (state.students.find<Types.Student>(func(s : Types.Student) { s.id == studentId })) {
      case null null;
      case (?student) {
        ?{
          student;
          attendance = state.attendance.get(studentId);
          performance = state.performance.get(studentId);
          engagement = state.engagement.get(studentId);
          risk = ?computeRisk(state, studentId);
        };
      };
    };
  };

  public func getRiskDistribution(state : State) : Types.RiskDistribution {
    var critical = 0;
    var high = 0;
    var medium = 0;
    var low = 0;
    for (s in state.students.values()) {
      let risk = computeRisk(state, s.id);
      switch (risk.riskLevel) {
        case (#critical) { critical += 1 };
        case (#high) { high += 1 };
        case (#medium) { medium += 1 };
        case (#low) { low += 1 };
      };
    };
    { critical; high; medium; low };
  };

  public func getRiskTrend(state : State) : [Types.TrendPoint] {
    let current = getRiskDistribution(state);
    let total = current.critical + current.high + current.medium + current.low;
    if (total == 0) return [];

    // Simulate 6-month trend: older months show slightly higher risk counts
    [
      {
        periodLabel = "Nov";
        critical = current.critical + 3;
        high = current.high + 4;
        medium = if (current.medium > 4) current.medium - 4 else 0;
        low = if (current.low > 3) current.low - 3 else 0;
      },
      {
        periodLabel = "Dec";
        critical = current.critical + 2;
        high = current.high + 3;
        medium = if (current.medium > 3) current.medium - 3 else 0;
        low = if (current.low > 2) current.low - 2 else 0;
      },
      {
        periodLabel = "Jan";
        critical = current.critical + 2;
        high = current.high + 2;
        medium = if (current.medium > 2) current.medium - 2 else 0;
        low = if (current.low > 2) current.low - 2 else 0;
      },
      {
        periodLabel = "Feb";
        critical = current.critical + 1;
        high = current.high + 1;
        medium = if (current.medium > 1) current.medium - 1 else 0;
        low = if (current.low > 1) current.low - 1 else 0;
      },
      {
        periodLabel = "Mar";
        critical = current.critical + 1;
        high = current.high;
        medium = current.medium;
        low = if (current.low > 1) current.low - 1 else 0;
      },
      {
        periodLabel = "Apr";
        critical = current.critical;
        high = current.high;
        medium = current.medium;
        low = current.low;
      },
    ];
  };

  // ── Seed helpers ──────────────────────────────────────────────────────────

  func addStudent(
    state : State,
    name : Text,
    program : Text,
    year : Nat,
    attendancePct : Float,
    gpa : Float,
    libraryVisits : Nat,
    officeHours : Nat,
    extracurriculars : Nat,
    lmsFreq : Nat,
  ) {
    let id = state.nextId.value;
    state.nextId.value += 1;

    let nameLower = name.toLower().replace(#char ' ', ".");
    let email = nameLower # "@university.edu";

    let student : Types.Student = {
      id;
      name;
      email;
      program;
      year;
      enrollmentDate = Time.now();
      status = #active;
    };
    state.students.add(student);

    let totalClasses = 40;
    let attended = Int.abs((attendancePct * 40.0).toInt());
    state.attendance.add(id, {
      studentId = id;
      percentage = attendancePct;
      totalClasses;
      attended;
    });

    let g1 = if (gpa + 0.1 > 4.0) 4.0 else gpa + 0.1;
    let g2 = if (gpa - 0.1 < 0.0) 0.0 else gpa - 0.1;
    state.performance.add(id, {
      studentId = id;
      gpa;
      semester = "Spring 2026";
      grades = [
        { courseName = "Core Module I"; grade = g1 },
        { courseName = "Core Module II"; grade = g2 },
        { courseName = "Elective"; grade = gpa },
      ];
    });

    state.engagement.add(id, {
      studentId = id;
      libraryVisits;
      officeHoursAttended = officeHours;
      extracurricularsCount = extracurriculars;
      lmsLoginFrequency = lmsFreq;
    });
  };

  public func seedSampleData(state : State) : () {
    if (state.students.size() > 0) return;

    // ── CRITICAL RISK (~15% ≈ 6 students) ────────────────────────────────
    addStudent(state, "Marcus Johnson",    "Computer Science",      2, 0.31, 0.8, 0, 0, 0, 1);
    addStudent(state, "Aisha Patel",       "Business Administration",3, 0.35, 0.9, 0, 0, 0, 2);
    addStudent(state, "Diego Rivera",      "Medicine",              1, 0.28, 1.1, 0, 0, 0, 1);
    addStudent(state, "Fatima Al-Hassan",  "Engineering",           2, 0.33, 0.7, 1, 0, 0, 1);
    addStudent(state, "Kevin Osei",        "Arts",                  4, 0.30, 1.0, 0, 0, 0, 2);
    addStudent(state, "Priya Sharma",      "Computer Science",      1, 0.29, 1.2, 0, 0, 0, 1);

    // ── HIGH RISK (~25% ≈ 10 students) ────────────────────────────────────
    addStudent(state, "Carlos Mendez",     "Engineering",           3, 0.52, 1.8, 2, 1, 0, 4);
    addStudent(state, "Yuki Tanaka",       "Business Administration",2, 0.55, 1.6, 1, 0, 1, 3);
    addStudent(state, "Amara Diallo",      "Medicine",              2, 0.58, 1.9, 2, 1, 0, 5);
    addStudent(state, "James Okonkwo",     "Computer Science",      3, 0.50, 1.7, 1, 1, 0, 4);
    addStudent(state, "Sofia Martini",     "Arts",                  1, 0.54, 1.5, 3, 0, 1, 3);
    addStudent(state, "Rashid Al-Farsi",   "Engineering",           4, 0.56, 2.0, 2, 1, 0, 4);
    addStudent(state, "Mei Lin Chen",      "Business Administration",1, 0.53, 1.8, 1, 0, 0, 3);
    addStudent(state, "Oluwaseun Adeyemi", "Computer Science",      2, 0.57, 1.6, 2, 1, 1, 5);
    addStudent(state, "Elena Volkov",      "Medicine",              3, 0.51, 1.9, 1, 0, 0, 4);
    addStudent(state, "Isaac Asante",      "Arts",                  2, 0.59, 1.7, 2, 1, 0, 3);

    // ── MEDIUM RISK (~35% ≈ 14 students) ──────────────────────────────────
    addStudent(state, "Ana Lima",          "Business Administration",2, 0.72, 2.4, 4, 2, 1, 7);
    addStudent(state, "Tobias Weber",      "Engineering",           3, 0.70, 2.3, 3, 2, 1, 8);
    addStudent(state, "Chioma Eze",        "Medicine",              4, 0.74, 2.5, 5, 2, 1, 7);
    addStudent(state, "Lena Hoffmann",     "Computer Science",      1, 0.71, 2.2, 4, 1, 2, 6);
    addStudent(state, "Samuel Mensah",     "Arts",                  3, 0.73, 2.6, 3, 2, 1, 8);
    addStudent(state, "Nina Petrov",       "Engineering",           2, 0.75, 2.4, 4, 2, 0, 7);
    addStudent(state, "Hassan Al-Rashid",  "Business Administration",4, 0.68, 2.3, 3, 1, 1, 6);
    addStudent(state, "Valentina Cruz",    "Medicine",              1, 0.76, 2.5, 4, 2, 1, 7);
    addStudent(state, "Kofi Boateng",      "Computer Science",      3, 0.69, 2.2, 3, 2, 0, 8);
    addStudent(state, "Mia Nguyen",        "Arts",                  2, 0.77, 2.4, 5, 1, 2, 7);
    addStudent(state, "Andrei Popescu",    "Engineering",           1, 0.72, 2.6, 4, 2, 1, 6);
    addStudent(state, "Zara Ahmed",        "Business Administration",3, 0.74, 2.3, 3, 2, 1, 8);
    addStudent(state, "Felix Muller",      "Computer Science",      2, 0.71, 2.5, 4, 1, 1, 7);
    addStudent(state, "Adaeze Okafor",     "Medicine",              4, 0.73, 2.4, 3, 2, 0, 6);

    // ── LOW RISK (~25% ≈ 10 students) ─────────────────────────────────────
    addStudent(state, "Emily Chen",        "Computer Science",      4, 0.94, 3.8, 10, 5, 3, 15);
    addStudent(state, "Alexander Kim",     "Engineering",           3, 0.96, 3.9,  9, 4, 3, 14);
    addStudent(state, "Isabella Santos",   "Medicine",              2, 0.92, 3.7,  8, 5, 2, 13);
    addStudent(state, "Daniel Osei",       "Business Administration",4, 0.95, 3.6, 10, 4, 3, 15);
    addStudent(state, "Sophie Leclerc",    "Arts",                  3, 0.90, 3.5,  9, 5, 4, 14);
    addStudent(state, "Mohammed Hassan",   "Engineering",           2, 0.93, 3.8,  8, 4, 3, 13);
    addStudent(state, "Yuna Park",         "Computer Science",      4, 0.97, 4.0, 10, 5, 3, 15);
    addStudent(state, "Lucas Oliveira",    "Medicine",              3, 0.91, 3.7,  9, 4, 2, 14);
    addStudent(state, "Amelia Thompson",   "Business Administration",1, 0.94, 3.6,  8, 5, 3, 13);
    addStudent(state, "Ravi Patel",        "Arts",                  2, 0.96, 3.9, 10, 5, 4, 15);
  };
};
