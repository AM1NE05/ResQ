import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-BCiOq1yH.js";
import { a as useI18n, s as supabase, t as toast } from "./router-Bo5vnDPi.js";
import { c as createLucideIcon, A as AppShell, u as useIsAdmin, a as Siren, V as Video } from "./AppShell-CWx62ij6.js";
import { C as Clock } from "./clock-DAFQ4lE9.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function AdminPage() {
  const {
    t
  } = useI18n();
  const {
    isAdmin,
    loading: roleLoading
  } = useIsAdmin();
  const [stats, setStats] = reactExports.useState(null);
  const [alerts, setAlerts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!isAdmin) return;
    refresh();
  }, [isAdmin]);
  const refresh = async () => {
    setLoading(true);
    const [{
      data: statsData
    }, {
      data: alertsData
    }] = await Promise.all([supabase.rpc("admin_stats"), supabase.from("alerts").select("*").order("created_at", {
      ascending: false
    }).limit(50)]);
    if (statsData) setStats(statsData);
    if (alertsData) setAlerts(alertsData);
    setLoading(false);
  };
  const updateStatus = async (id, status) => {
    const {
      error
    } = await supabase.from("alerts").update({
      status
    }).eq("id", id);
    if (error) return toast.error(error.message);
    setAlerts((a) => a.map((x) => x.id === id ? {
      ...x,
      status
    } : x));
  };
  if (roleLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-muted-foreground", children: "..." });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mx-auto h-12 w-12 text-emergency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm font-medium", children: t("admin.notAdmin") })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("admin.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: "ResQ Najda" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Users, label: t("admin.stats.users"), value: stats?.total_users ?? 0, tone: "text-info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Siren, label: t("admin.stats.alerts"), value: stats?.total_alerts ?? 0, tone: "text-emergency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Clock, label: t("admin.stats.pending"), value: stats?.pending_alerts ?? 0, tone: "text-warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Video, label: t("admin.stats.complaints"), value: stats?.total_complaints ?? 0, tone: "text-navy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Upload, label: t("admin.stats.uploaders"), value: stats?.total_uploaders ?? 0, tone: "text-info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Calendar, label: t("admin.stats.today"), value: stats?.alerts_today ?? 0, tone: "text-emergency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CalendarDays, label: t("admin.stats.week"), value: stats?.alerts_week ?? 0, tone: "text-emergency" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-bold", children: t("admin.alerts.title") }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground", children: "..." }),
      !loading && alerts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground", children: t("admin.alerts.empty") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: alerts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl bg-card p-3 shadow-[var(--shadow-card)] ${a.status === "pending" ? "border-l-4 border-emergency" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-emergency/15 px-2 py-0.5 text-xs font-bold text-emergency", children: t(`sos.type.${a.alert_type}`) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t(`severity.${a.severity}`) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-medium ${a.status === "pending" ? "bg-warning/30 text-foreground" : a.status === "resolved" ? "bg-success/20 text-success" : "bg-info/20 text-info"}`, children: t(`status.${a.status}`) })
          ] }),
          a.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm", children: a.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
            a.latitude.toFixed(4),
            ", ",
            a.longitude.toFixed(4),
            " ·",
            " ",
            new Date(a.created_at).toLocaleString()
          ] })
        ] }) }),
        a.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(a.id, "dispatched"), className: "flex-1 rounded-lg bg-info px-3 py-1.5 text-xs font-medium text-white", children: t("admin.markDispatched") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(a.id, "resolved"), className: "flex-1 rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-white", children: t("admin.markResolved") })
        ] }),
        a.status === "dispatched" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus(a.id, "resolved"), className: "mt-2 w-full rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-white", children: t("admin.markResolved") })
      ] }, a.id)) })
    ] })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${tone}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-extrabold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPage, {}) });
export {
  SplitComponent as component
};
