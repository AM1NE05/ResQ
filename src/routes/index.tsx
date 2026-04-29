import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Activity, Flame, Shield, Car, AlertTriangle, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResQ Najda — SOS" },
      { name: "description", content: "Tap the SOS button to send your location and call for help." },
    ],
  }),
  component: SosPage,
});

type AlertType = "medical" | "fire" | "police" | "accident" | "other";

const TYPES: { id: AlertType; icon: typeof Activity; tone: string }[] = [
  { id: "medical", icon: Activity, tone: "bg-info/15 text-info" },
  { id: "fire", icon: Flame, tone: "bg-emergency/15 text-emergency" },
  { id: "police", icon: Shield, tone: "bg-navy/15 text-navy" },
  { id: "accident", icon: Car, tone: "bg-warning/20 text-foreground" },
  { id: "other", icon: AlertTriangle, tone: "bg-muted text-foreground" },
];

function SosPage() {
  return (
    <AppShell>
      <SosContent />
    </AppShell>
  );
}

function SosContent() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [type, setType] = useState<AlertType>("medical");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const sendSOS = async () => {
    if (!user) return;
    setBusy(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) return reject(new Error("Geolocation unavailable"));
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
      });
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setCoords({ lat, lng });

      const { error } = await supabase.from("alerts").insert({
        user_id: user.id,
        alert_type: type,
        severity: "high",
        latitude: lat,
        longitude: lng,
        description: description.trim() || null,
      });
      if (error) throw error;
      toast.success(t("sos.sent"));
      setDescription("");
    } catch (err: any) {
      toast.error(err?.message ?? t("sos.error"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]">
        <h1 className="text-2xl font-extrabold leading-tight">{t("sos.title")}</h1>
        <p className="mt-1 text-sm text-white/70">{t("sos.subtitle")}</p>
      </div>

      {/* Type chooser */}
      <div className="grid grid-cols-5 gap-2">
        {TYPES.map(({ id, icon: Icon, tone }) => (
          <button
            key={id}
            onClick={() => setType(id)}
            className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-xs font-medium transition ${
              type === id ? "ring-2 ring-emergency bg-card shadow-[var(--shadow-card)]" : "bg-card"
            }`}
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span>{t(`sos.type.${id}`)}</span>
          </button>
        ))}
      </div>

      {/* SOS BUTTON */}
      <div className="flex flex-col items-center gap-4 py-4">
        <button
          onClick={sendSOS}
          disabled={busy}
          className="btn-emergency animate-sos relative flex h-48 w-48 flex-col items-center justify-center rounded-full text-white transition active:scale-95 disabled:opacity-70"
        >
          <span className="text-5xl font-black tracking-wider">SOS</span>
          <span className="mt-1 text-xs font-medium uppercase tracking-widest opacity-90">
            {busy ? t("sos.sending") : t("sos.button")}
          </span>
        </button>
        {coords && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
          </p>
        )}
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t("sos.describe")}
        maxLength={500}
        rows={3}
        className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-emergency"
      />
    </div>
  );
}
