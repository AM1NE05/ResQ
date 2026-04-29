import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShieldAlert, Users, Siren, Clock, Video, Upload, Calendar, CalendarDays } from "lucide-react";
import { A as AppShell, u as useIsAdmin } from "./AppShell-BtAnQFby.js";
import { a as useI18n, s as supabase } from "./router-CARJVMO8.js";
import "@radix-ui/react-dropdown-menu";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-router";
import "zod";
import "@supabase/supabase-js";
function AdminPage() {
  const {
    t
  } = useI18n();
  const {
    isAdmin,
    loading: roleLoading
  } = useIsAdmin();
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx("div", { className: "py-10 text-center text-muted-foreground", children: "..." });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-8 text-center", children: [
      /* @__PURE__ */ jsx(ShieldAlert, { className: "mx-auto h-12 w-12 text-emergency" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm font-medium", children: t("admin.notAdmin") })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold", children: t("admin.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70", children: "ResQ Najda" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(StatCard, { icon: Users, label: t("admin.stats.users"), value: stats?.total_users ?? 0, tone: "text-info" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Siren, label: t("admin.stats.alerts"), value: stats?.total_alerts ?? 0, tone: "text-emergency" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Clock, label: t("admin.stats.pending"), value: stats?.pending_alerts ?? 0, tone: "text-warning" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Video, label: t("admin.stats.complaints"), value: stats?.total_complaints ?? 0, tone: "text-navy" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Upload, label: t("admin.stats.uploaders"), value: stats?.total_uploaders ?? 0, tone: "text-info" }),
      /* @__PURE__ */ jsx(StatCard, { icon: Calendar, label: t("admin.stats.today"), value: stats?.alerts_today ?? 0, tone: "text-emergency" }),
      /* @__PURE__ */ jsx(StatCard, { icon: CalendarDays, label: t("admin.stats.week"), value: stats?.alerts_week ?? 0, tone: "text-emergency" })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-2 text-sm font-bold", children: t("admin.alerts.title") }),
      loading && /* @__PURE__ */ jsx("div", { className: "text-center text-muted-foreground", children: "..." }),
      !loading && alerts.length === 0 && /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground", children: t("admin.alerts.empty") }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: alerts.map((a) => /* @__PURE__ */ jsxs("div", { className: `rounded-2xl bg-card p-3 shadow-[var(--shadow-card)] ${a.status === "pending" ? "border-l-4 border-emergency" : ""}`, children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-emergency/15 px-2 py-0.5 text-xs font-bold text-emergency", children: t(`sos.type.${a.alert_type}`) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: t(`severity.${a.severity}`) }),
            /* @__PURE__ */ jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-medium ${a.status === "pending" ? "bg-warning/30 text-foreground" : a.status === "resolved" ? "bg-success/20 text-success" : "bg-info/20 text-info"}`, children: t(`status.${a.status}`) })
          ] }),
          a.description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm", children: a.description }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
            a.latitude.toFixed(4),
            ", ",
            a.longitude.toFixed(4),
            " ·",
            " ",
            new Date(a.created_at).toLocaleString()
          ] })
        ] }) }),
        a.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => updateStatus(a.id, "dispatched"), className: "flex-1 rounded-lg bg-info px-3 py-1.5 text-xs font-medium text-white", children: t("admin.markDispatched") }),
          /* @__PURE__ */ jsx("button", { onClick: () => updateStatus(a.id, "resolved"), className: "flex-1 rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-white", children: t("admin.markResolved") })
        ] }),
        a.status === "dispatched" && /* @__PURE__ */ jsx("button", { onClick: () => updateStatus(a.id, "resolved"), className: "mt-2 w-full rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-white", children: t("admin.markResolved") })
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
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsx(Icon, { className: `h-5 w-5 ${tone}` }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 text-2xl font-extrabold", children: value }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(AdminPage, {}) });
export {
  SplitComponent as component
};
