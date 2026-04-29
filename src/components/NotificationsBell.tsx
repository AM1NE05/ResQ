import { useEffect, useState } from "react";
import { Bell, CheckCheck, Siren } from "lucide-react";
import { supabase } from "@/integrations/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

interface NotificationRow {
  id: string;
  title: string;
  body: string | null;
  status: string | null;
  read: boolean;
  created_at: string;
  alert_id: string | null;
}

export function NotificationsBell() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [items, setItems] = useState<NotificationRow[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    let active = true;

    const load = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (active && data) setItems(data as NotificationRow[]);
    };
    load();

    const channel = supabase
      .channel(`notif:${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const n = payload.new as NotificationRow;
          setItems((prev) => [n, ...prev]);
          toast.success(t(`notif.${n.title}.title`), {
            description: t(`notif.${n.title}.body`),
            icon: <Siren className="h-4 w-4" />,
          });
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [user, t]);

  const unread = items.filter((i) => !i.read).length;

  const markAllRead = async () => {
    if (unread === 0) return;
    const ids = items.filter((i) => !i.read).map((i) => i.id);
    await supabase.from("notifications").update({ read: true }).in("id", ids);
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen((o) => !o);
          if (!open) markAllRead();
        }}
        className="relative rounded-full p-2 text-navy-foreground hover:bg-white/10"
        aria-label="notifications"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emergency px-1 text-[10px] font-bold text-emergency-foreground">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute end-0 mt-2 z-50 w-80 max-w-[90vw] rounded-2xl bg-card text-card-foreground shadow-[var(--shadow-elevated)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="text-sm font-bold">{t("notif.title")}</span>
              <CheckCheck className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {items.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  {t("notif.empty")}
                </div>
              )}
              {items.map((n) => (
                <div key={n.id} className={`flex gap-3 border-b border-border px-4 py-3 ${!n.read ? "bg-emergency/5" : ""}`}>
                  <Siren className="mt-0.5 h-5 w-5 flex-shrink-0 text-emergency" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{t(`notif.${n.title}.title`)}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{t(`notif.${n.title}.body`)}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {new Date(n.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
