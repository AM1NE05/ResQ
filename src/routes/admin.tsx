import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Users, Siren, Clock, Video, Upload, Calendar, CalendarDays, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "ResQ Najda — Admin" }] }),
  component: () => (
    <AppShell>
      <AdminPage />
    </AppShell>
  ),
});

interface Stats {
  total_users: number;
  total_alerts: number;
  pending_alerts: number;
  total_complaints: number;
  total_uploaders: number;
  alerts_today: number;
  alerts_week: number;
}

interface AlertRow {
  id: string;
  alert_type: string;
  severity: string;
  status: string;
  description: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
  user_id: string;
}

function AdminPage() {
  const { t } = useI18n();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [stats, setStats] = useState<Stats | null>(null);
  const [alerts, setAlerts] = useState<AlertRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    refresh();
  }, [isAdmin]);

  const refresh = async () => {
    setLoading(true);
    const [{ data: statsData }, { data: alertsData }] = await Promise.all([
      supabase.rpc("admin_stats"),
      supabase
        .from("alerts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);
    if (statsData) setStats(statsData as unknown as Stats);
    if (alertsData) setAlerts(alertsData as AlertRow[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "dispatched" | "resolved") => {
    const { error } = await supabase
      .from("alerts")
      .update({ status })
      .eq("id", id);
    if (error) return toast.error(error.message);
    setAlerts((a) => a.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  if (roleLoading) {
    return <div className="py-10 text-center text-muted-foreground">...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="rounded-2xl bg-card p-8 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-emergency" />
        <p className="mt-3 text-sm font-medium">{t("admin.notAdmin")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]">
        <h1 className="text-2xl font-extrabold">{t("admin.title")}</h1>
        <p className="text-xs text-white/70">ResQ Najda</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Users} label={t("admin.stats.users")} value={stats?.total_users ?? 0} tone="text-info" />
        <StatCard icon={Siren} label={t("admin.stats.alerts")} value={stats?.total_alerts ?? 0} tone="text-emergency" />
        <StatCard icon={Clock} label={t("admin.stats.pending")} value={stats?.pending_alerts ?? 0} tone="text-warning" />
        <StatCard icon={Video} label={t("admin.stats.complaints")} value={stats?.total_complaints ?? 0} tone="text-navy" />
        <StatCard icon={Upload} label={t("admin.stats.uploaders")} value={stats?.total_uploaders ?? 0} tone="text-info" />
        <StatCard icon={Calendar} label={t("admin.stats.today")} value={stats?.alerts_today ?? 0} tone="text-emergency" />
        <StatCard icon={CalendarDays} label={t("admin.stats.week")} value={stats?.alerts_week ?? 0} tone="text-emergency" />
      </div>

      {/* Alerts list */}
      <section>
        <h2 className="mb-2 text-sm font-bold">{t("admin.alerts.title")}</h2>
        {loading && <div className="text-center text-muted-foreground">...</div>}
        {!loading && alerts.length === 0 && (
          <div className="rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground">
            {t("admin.alerts.empty")}
          </div>
        )}
        <div className="space-y-2">
          {alerts.map((a) => (
            <div
              key={a.id}
              className={`rounded-2xl bg-card p-3 shadow-[var(--shadow-card)] ${
                a.status === "pending" ? "border-l-4 border-emergency" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emergency/15 px-2 py-0.5 text-xs font-bold text-emergency">
                      {t(`sos.type.${a.alert_type}`)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t(`severity.${a.severity}`)}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        a.status === "pending"
                          ? "bg-warning/30 text-foreground"
                          : a.status === "resolved"
                            ? "bg-success/20 text-success"
                            : "bg-info/20 text-info"
                      }`}
                    >
                      {t(`status.${a.status}`)}
                    </span>
                  </div>
                  {a.description && (
                    <p className="mt-1 text-sm">{a.description}</p>
                  )}
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {a.latitude.toFixed(4)}, {a.longitude.toFixed(4)} ·{" "}
                    {new Date(a.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {a.status === "pending" && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => updateStatus(a.id, "dispatched")}
                    className="flex-1 rounded-lg bg-info px-3 py-1.5 text-xs font-medium text-white"
                  >
                    {t("admin.markDispatched")}
                  </button>
                  <button
                    onClick={() => updateStatus(a.id, "resolved")}
                    className="flex-1 rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-white"
                  >
                    {t("admin.markResolved")}
                  </button>
                </div>
              )}
              {a.status === "dispatched" && (
                <button
                  onClick={() => updateStatus(a.id, "resolved")}
                  className="mt-2 w-full rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-white"
                >
                  {t("admin.markResolved")}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
      <Icon className={`h-5 w-5 ${tone}`} />
      <div className="mt-2 text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
