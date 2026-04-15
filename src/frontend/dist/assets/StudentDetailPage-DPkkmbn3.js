import { j as jsxRuntimeExports, b as useParams, r as reactExports, L as Link, c as useInternetIdentity, a as ue } from "./index-C9bX-I14.js";
import { P as ProtectedRoute, L as Layout, c as useStudent, S as Skeleton, b as ShieldAlert, R as RiskBadge, I as InterventionType } from "./useStudents-BhSw-i5u.js";
import { B as Badge } from "./badge-Dxxb6v-7.js";
import { c as createLucideIcon, B as Button, G as GraduationCap } from "./users-CS3ehMd_.js";
import { B as BookOpen, C as Clock, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, L as Label, T as Textarea } from "./textarea-D2aSGLI6.js";
import { c as useStudentInterventions, C as CircleCheck, d as useCreateIntervention } from "./useInterventions-DLyFWOj3.js";
import { B as TrendingUp, R as ResponsiveContainer, P as PieChart, F as Pie, H as Cell } from "./PieChart-BOPYqiHL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const interventionTypeOptions = Object.values(InterventionType).map((v) => ({
  value: v,
  label: v.replace(/([A-Z])/g, " $1").trim()
}));
const interventionStatusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
  },
  active: {
    label: "Active",
    icon: Brain,
    className: "text-blue-400 bg-blue-500/10 border-blue-500/20"
  },
  resolved: {
    label: "Resolved",
    icon: CircleCheck,
    className: "text-green-400 bg-green-500/10 border-green-500/20"
  }
};
const statusBadgeClass = {
  active: "text-green-400 bg-green-500/10 border-green-500/20",
  atRisk: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  droppedOut: "text-red-400 bg-red-500/10 border-red-500/20"
};
const statusLabel = {
  active: "Active",
  atRisk: "At Risk",
  droppedOut: "Dropped Out"
};
function RiskGauge({ score, level }) {
  const gaugeColor = level === "critical" ? "#ef4444" : level === "high" ? "#f97316" : level === "medium" ? "#eab308" : "#22c55e";
  const data = [{ value: score }, { value: 100 - score }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: 140, height: 140 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 140, height: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Pie,
          {
            data,
            cx: 65,
            cy: 65,
            innerRadius: 50,
            outerRadius: 65,
            startAngle: 90,
            endAngle: -270,
            dataKey: "value",
            strokeWidth: 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: gaugeColor }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: "rgba(255,255,255,0.05)" })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-3xl font-bold font-display leading-none",
              style: { color: gaugeColor },
              children: score
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide", children: "Risk Score" })
        ] })
      ]
    }
  );
}
function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  iconClass = "text-primary"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg border border-border p-4 flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${iconClass}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-display text-foreground leading-none", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
    ] })
  ] });
}
function NewInterventionModal({
  open,
  onClose,
  studentId
}) {
  const [type, setType] = reactExports.useState(InterventionType.academicCounseling);
  const [description, setDescription] = reactExports.useState("");
  const createIntervention = useCreateIntervention();
  const { identity } = useInternetIdentity();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      ue.error("Please provide a description.");
      return;
    }
    if (!identity) {
      ue.error("Not authenticated.");
      return;
    }
    try {
      await createIntervention.mutateAsync({
        studentId: BigInt(studentId),
        interventionType: type,
        description: description.trim(),
        advisorId: identity.getPrincipal()
      });
      ue.success("Intervention created successfully.");
      setDescription("");
      setType(InterventionType.academicCounseling);
      onClose();
    } catch {
      ue.error("Failed to create intervention.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "bg-card border-border max-w-md",
      "data-ocid": "intervention.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 text-primary" }),
          "New Intervention"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "int-type", className: "text-sm text-foreground", children: "Intervention Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "int-type",
                value: type,
                onChange: (e) => setType(e.target.value),
                className: "w-full text-sm bg-muted border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                "data-ocid": "intervention.type.select",
                children: interventionTypeOptions.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.value, children: t.label }, t.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "int-desc", className: "text-sm text-foreground", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "int-desc",
                placeholder: "Describe the intervention plan and expected outcomes…",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                rows: 4,
                className: "bg-muted border-border text-foreground resize-none text-sm",
                "data-ocid": "intervention.description.textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: onClose,
                "data-ocid": "intervention.cancel_button",
                className: "text-muted-foreground hover:text-foreground",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "sm",
                disabled: createIntervention.isPending || !description.trim(),
                "data-ocid": "intervention.submit_button",
                children: createIntervention.isPending ? "Creating…" : "Create Intervention"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function StudentDetailContent() {
  const { id } = useParams({ from: "/students/$id" });
  const studentId = Number.parseInt(id, 10);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const { data: detail, isLoading } = useStudent(
    Number.isNaN(studentId) ? null : studentId
  );
  const { data: interventions = [], isLoading: interventionsLoading } = useStudentInterventions(Number.isNaN(studentId) ? null : studentId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 lg:p-6 max-w-6xl mx-auto space-y-5",
        "data-ocid": "student_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-36" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-lg" })
        ]
      }
    );
  }
  if (!detail) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center",
        "data-ocid": "student_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-14 h-14 text-muted-foreground/30 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-lg", children: "Student not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This student may not exist or was removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/students", className: "mt-4 inline-block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Students"
          ] }) })
        ]
      }
    );
  }
  const { student, attendance, performance, engagement, risk } = detail;
  const sClass = statusBadgeClass[student.status] ?? statusBadgeClass.active;
  const sLabel = statusLabel[student.status] ?? "Unknown";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-6 max-w-6xl mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/students",
        "data-ocid": "student_detail.back_button",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Students"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5",
        "data-ocid": "student_detail.header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-primary font-display", children: student.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: student.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${sClass}`,
                  children: sLabel
                }
              ),
              risk && /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { level: risk.riskLevel, size: "md" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: student.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-3.5 h-3.5" }),
                student.program
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                "Year ",
                student.year
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                "Enrolled",
                " ",
                new Date(
                  Number(student.enrollmentDate) / 1e6
                ).toLocaleDateString()
              ] })
            ] })
          ] }),
          risk && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", "data-ocid": "student_detail.risk_gauge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskGauge, { score: risk.riskScore, level: risk.riskLevel }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
        "data-ocid": "student_detail.metrics",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              icon: Clock,
              label: "Attendance Rate",
              value: attendance ? `${attendance.percentage.toFixed(1)}%` : "N/A",
              sub: attendance ? `${attendance.attended} / ${attendance.totalClasses} classes` : void 0,
              iconClass: "text-blue-400"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              icon: TrendingUp,
              label: "Current GPA",
              value: performance ? performance.gpa.toFixed(2) : "N/A",
              sub: performance ? `Semester: ${performance.semester}` : void 0,
              iconClass: "text-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              icon: Zap,
              label: "LMS Engagement",
              value: engagement ? `${engagement.lmsLoginFrequency}` : "N/A",
              sub: engagement ? `${engagement.officeHoursAttended} office hours attended` : void 0,
              iconClass: "text-purple-400"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
      risk && risk.factors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border p-5",
          "data-ocid": "student_detail.risk_factors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-orange-400" }),
              "Risk Factors"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: risk.factors.map((factor, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `student_detail.risk_factor.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: factor.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "Val:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: factor.value.toFixed(2) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "Wt:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono", children: [
                          (factor.weight * 100).toFixed(0),
                          "%"
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-smooth",
                      style: { width: `${Math.min(100, factor.value * 100)}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: factor.description })
                ]
              },
              factor.name
            )) })
          ]
        }
      ),
      performance && performance.grades.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border p-5",
          "data-ocid": "student_detail.performance",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
                "Course Grades"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs border-border text-muted-foreground",
                  children: performance.semester
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: performance.grades.map((g, i) => {
              const pct = Math.min(100, g.grade / 4 * 100);
              const barColor = g.grade >= 3 ? "bg-green-500" : g.grade >= 2 ? "bg-yellow-500" : "bg-red-500";
              const textColor = g.grade >= 3 ? "text-green-400" : g.grade >= 2 ? "text-yellow-400" : "text-red-400";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `student_detail.grade.${i + 1}`,
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground flex-1 truncate min-w-0", children: g.courseName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-1.5 rounded-full bg-muted overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `h-full rounded-full ${barColor}`,
                        style: { width: `${pct}%` }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs font-mono font-bold w-8 text-right flex-shrink-0 ${textColor}`,
                        children: g.grade.toFixed(1)
                      }
                    )
                  ]
                },
                g.courseName
              );
            }) })
          ]
        }
      ),
      engagement && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border p-5",
          "data-ocid": "student_detail.engagement",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-purple-400" }),
              "Engagement Breakdown"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                label: "LMS Logins / Week",
                value: engagement.lmsLoginFrequency,
                max: 20
              },
              {
                label: "Library Visits",
                value: engagement.libraryVisits,
                max: 10
              },
              {
                label: "Office Hours Attended",
                value: engagement.officeHoursAttended,
                max: 10
              },
              {
                label: "Extracurricular Activities",
                value: engagement.extracurricularsCount,
                max: 5
              }
            ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: m.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold font-mono text-foreground", children: m.value })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full bg-purple-500/60",
                  style: {
                    width: `${Math.min(100, m.value / m.max * 100)}%`
                  }
                }
              ) })
            ] }, m.label)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border p-5",
        "data-ocid": "student_detail.interventions",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
              "Interventions",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "border-border text-muted-foreground text-xs",
                  children: interventions.length
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                onClick: () => setModalOpen(true),
                "data-ocid": "student_detail.new_intervention.open_modal_button",
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
                  "New Intervention"
                ]
              }
            )
          ] }),
          interventionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "student_detail.interventions.loading_state",
              className: "space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" })
              ]
            }
          ) : interventions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-10 text-center",
              "data-ocid": "student_detail.interventions.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-10 h-10 text-muted-foreground/30 mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "No interventions yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Create the first intervention for this student." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: interventions.map((intv, i) => {
            const sc = interventionStatusConfig[intv.status] ?? interventionStatusConfig.pending;
            const StatusIcon = sc.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `student_detail.interventions.item.${i + 1}`,
                className: "flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${sc.className}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: intv.interventionType.replace(/([A-Z])/g, " $1").trim() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `inline-flex items-center text-[11px] px-1.5 py-0.5 rounded-full border font-medium ${sc.className}`,
                          children: sc.label
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: intv.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 mt-1", children: new Date(
                      Number(intv.createdAt) / 1e6
                    ).toLocaleDateString() })
                  ] })
                ]
              },
              intv.id
            );
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NewInterventionModal,
      {
        open: modalOpen,
        onClose: () => setModalOpen(false),
        studentId
      }
    )
  ] });
}
function StudentDetailPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudentDetailContent, {}) }) });
}
export {
  StudentDetailPage as default
};
