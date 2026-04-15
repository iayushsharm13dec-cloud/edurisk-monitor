import { j as jsxRuntimeExports, r as reactExports, L as Link } from "./index-C9bX-I14.js";
import { P as ProtectedRoute, L as Layout, u as useStudents, S as Skeleton, R as RiskBadge } from "./useStudents-BhSw-i5u.js";
import { B as Badge } from "./badge-Dxxb6v-7.js";
import { c as createLucideIcon, a as cn, U as Users, B as Button } from "./users-CS3ehMd_.js";
import { T as TriangleAlert } from "./triangle-alert-DibjU-hk.js";
import { A as ArrowRight } from "./arrow-right-XCfI0GDO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const filterConfig = [
  { key: "all", label: "All Students", dotColor: "bg-muted-foreground" },
  { key: "critical", label: "Critical", dotColor: "bg-red-500" },
  { key: "high", label: "High", dotColor: "bg-orange-500" },
  { key: "medium", label: "Medium", dotColor: "bg-yellow-500" },
  { key: "low", label: "Low", dotColor: "bg-green-500" }
];
const riskBarColor = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500"
};
const statusConfig = {
  active: { label: "Active", className: "text-green-400 bg-green-500/10" },
  atRisk: { label: "At Risk", className: "text-orange-400 bg-orange-500/10" },
  droppedOut: { label: "Dropped Out", className: "text-red-400 bg-red-500/10" }
};
function SummaryBar({ students }) {
  const counts = reactExports.useMemo(
    () => students.reduce(
      (acc, s) => {
        acc[s.riskLevel] = (acc[s.riskLevel] ?? 0) + 1;
        return acc;
      },
      {}
    ),
    [students]
  );
  const items = [
    {
      key: "critical",
      label: "Critical Risk",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
      icon: "bg-red-500"
    },
    {
      key: "high",
      label: "High Risk",
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
      icon: "bg-orange-500"
    },
    {
      key: "medium",
      label: "Medium Risk",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/20",
      icon: "bg-yellow-500"
    },
    {
      key: "low",
      label: "Low Risk",
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
      icon: "bg-green-500"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6",
      "data-ocid": "students.summary_bar",
      children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-3 px-4 py-3 rounded-lg border ${item.bg}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: `w-4 h-4 flex-shrink-0 ${item.color}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-2xl font-bold font-display leading-none ${item.color}`,
                  children: counts[item.key] ?? 0
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.label })
            ] })
          ]
        },
        item.key
      ))
    }
  );
}
function StudentRow({
  student,
  index
}) {
  const statusCfg = statusConfig[student.status] ?? statusConfig.active;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/students/$id",
      params: { id: String(student.id) },
      "data-ocid": `students.item.${index + 1}`,
      className: "flex items-center gap-4 px-4 py-3.5 border-b border-border hover:bg-card/80 transition-smooth group cursor-pointer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary font-display", children: student.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: student.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: student.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block w-44 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground/80 truncate", children: student.program }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Year ",
            student.year
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col gap-1 w-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-bold font-mono ${riskBarColor[student.riskLevel].replace("bg-", "text-")}`,
                children: student.riskScore
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-full rounded-full transition-smooth ${riskBarColor[student.riskLevel]}`,
              style: { width: `${student.riskScore}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { level: student.riskLevel }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-flex items-center text-[11px] px-2 py-0.5 rounded-full font-medium ${statusCfg.className}`,
            children: statusCfg.label
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary hidden sm:block", children: "Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-primary" })
        ] })
      ]
    }
  );
}
function StudentsContent() {
  const { data: students = [], isLoading } = useStudents();
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("riskScore");
  const [sortAsc, setSortAsc] = reactExports.useState(false);
  const toggleSort = (key) => {
    if (sort === key) setSortAsc((v) => !v);
    else {
      setSort(key);
      setSortAsc(false);
    }
  };
  const filtered = reactExports.useMemo(() => {
    let list = [...students];
    if (filter !== "all") list = list.filter((s) => s.riskLevel === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.program.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      let diff = 0;
      if (sort === "riskScore") diff = a.riskScore - b.riskScore;
      else if (sort === "name") diff = a.name.localeCompare(b.name);
      else diff = a.program.localeCompare(b.program);
      return sortAsc ? diff : -diff;
    });
    return list;
  }, [students, filter, search, sort, sortAsc]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 lg:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold font-display text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-primary" }),
          "Student Risk List"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "Monitor at-risk students ·",
          " ",
          isLoading ? "Loading…" : `${students.length} total enrolled`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: "border-primary/30 text-primary bg-primary/10 font-mono text-sm px-3 py-1 hidden sm:flex",
          children: isLoading ? "—" : `${students.length} students`
        }
      )
    ] }),
    !isLoading && students.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryBar, { students }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "search",
            placeholder: "Search by name, email, or program…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 bg-card border-border text-sm",
            "data-ocid": "students.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: sort,
            onChange: (e) => setSort(e.target.value),
            className: "text-sm bg-card border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
            "data-ocid": "students.sort.select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "riskScore", children: "Sort: Risk Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "name", children: "Sort: Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "program", children: "Sort: Program" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", "aria-label": "Risk level filter", children: filterConfig.map((f) => {
      const isActive = filter === f.key;
      const count = f.key === "all" ? students.length : students.filter((s) => s.riskLevel === f.key).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `students.filter.${f.key}`,
          onClick: () => setFilter(f.key),
          className: `inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-smooth ${isActive ? "bg-card border-primary/40 text-primary shadow-sm" : "border-border text-muted-foreground hover:text-foreground bg-transparent"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.dotColor}`
              }
            ),
            f.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `rounded-full px-1.5 py-0.5 text-[10px] font-mono leading-none ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
                children: count
              }
            )
          ]
        },
        f.key
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-border bg-card overflow-hidden",
        "data-ocid": "students.list",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-4 px-4 py-2.5 bg-muted/40 border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center gap-1 hover:text-foreground transition-smooth",
                onClick: () => toggleSort("name"),
                children: [
                  "Student ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center gap-1 hover:text-foreground transition-smooth",
                onClick: () => toggleSort("program"),
                children: [
                  "Program ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block w-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center gap-1 hover:text-foreground transition-smooth",
                onClick: () => toggleSort("riskScore"),
                children: [
                  "Risk Score ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block w-20", children: "Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block w-20", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 text-right", children: "View" })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "students.loading_state", children: [
            "sk1",
            "sk2",
            "sk3",
            "sk4",
            "sk5",
            "sk6",
            "sk7",
            "sk8",
            "sk9",
            "sk10"
          ].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-4 px-4 py-3.5 border-b border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-36" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "hidden md:block h-3 w-32" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "hidden sm:block h-3 w-24" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "hidden sm:block h-5 w-16 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "hidden lg:block h-5 w-16 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4 rounded" })
              ]
            },
            sk
          )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 text-center",
              "data-ocid": "students.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-12 h-12 text-muted-foreground/30 mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "No students found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: search ? "Try a different search query." : "Adjust your filters." }),
                search && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "mt-3",
                    onClick: () => setSearch(""),
                    children: "Clear search"
                  }
                )
              ]
            }
          ) : filtered.map((student, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StudentRow, { student, index: i }, student.id))
        ]
      }
    ),
    !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3 text-right", children: [
      "Showing ",
      filtered.length,
      " of ",
      students.length,
      " students"
    ] })
  ] });
}
function StudentsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudentsContent, {}) }) });
}
export {
  StudentsPage as default
};
