import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/client";
import { Activity, Flame, Shield, Car, AlertTriangle, X, Navigation, HeartHandshake, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "ResQ Najda — Nearby alerts" },
      { name: "description", content: "Live map of incidents near you, sorted by distance." },
    ],
  }),
  component: () => (
    <AppShell>
      <MapPage />
    </AppShell>
  ),
});

interface AlertRow {
  id: string;
  alert_type: "medical" | "fire" | "police" | "accident" | "other";
  severity: "low" | "medium" | "high" | "critical";
  status: "pending" | "dispatched" | "resolved" | "cancelled";
  description: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
}

const SEV_COLOR: Record<AlertRow["severity"], string> = {
  low: "#62a96b",
  medium: "#e4a23a",
  high: "#e8553a",
  critical: "#c41e3a",
};

const TYPE_ICON: Record<AlertRow["alert_type"], typeof Activity> = {
  medical: Activity,
  fire: Flame,
  police: Shield,
  accident: Car,
  other: AlertTriangle,
};

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

function pinIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:34px;height:42px"><div style="position:absolute;inset:0;background:${color};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 10px rgba(0,0,0,.25)"></div><div style="position:absolute;top:8px;left:8px;width:18px;height:18px;background:white;border-radius:50%"></div></div>`,
    iconSize: [34, 42],
    iconAnchor: [17, 38],
  });
}

function CenterOn({ pos }: { pos: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (pos) map.setView([pos.lat, pos.lng], 13);
  }, [pos, map]);
  return null;
}

function MapPage() {
  const { t } = useI18n();
  const [alerts, setAlerts] = useState<AlertRow[]>([]);
  const [me, setMe] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<AlertRow | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setMe({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => setMe({ lat: 36.8065, lng: 10.1815 }),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setMe({ lat: 36.8065, lng: 10.1815 });
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("alerts")
        .select("*")
        .neq("status", "resolved")
        .order("created_at", { ascending: false })
        .limit(200);
      if (data) setAlerts(data as AlertRow[]);
    };
    load();
    const ch = supabase
      .channel("alerts-stream")
      .on("postgres_changes", { event: "*", schema: "public", table: "alerts" }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const sorted = useMemo(() => {
    const wrapped = alerts.map((a) => ({
      a,
      d: me ? distanceKm(me, { lat: a.latitude, lng: a.longitude }) : 0,
    }));
    if (me) wrapped.sort((x, y) => x.d - y.d);
    return wrapped;
  }, [alerts, me]);

  const center = me ?? { lat: 36.8065, lng: 10.1815 };
  const distanceTo = (a: AlertRow) =>
    me ? distanceKm(me, { lat: a.latitude, lng: a.longitude }) : null;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">{t("map.title")}</h1>

      <div className="h-72 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
        <MapContainer center={[center.lat, center.lng]} zoom={12} scrollWheelZoom>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CenterOn pos={me} />
          {me && <Marker position={[me.lat, me.lng]} icon={pinIcon("#1a4ed8")} />}
          {alerts.map((a) => (
            <Marker
              key={a.id}
              position={[a.latitude, a.longitude]}
              icon={pinIcon(SEV_COLOR[a.severity])}
              eventHandlers={{ click: () => setSelected(a) }}
            />
          ))}
        </MapContainer>
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground">{t("map.empty")}</p>
      ) : (
        <ul className="space-y-2">
          {sorted.map(({ a, d }) => {
            const Icon = TYPE_ICON[a.alert_type];
            return (
              <li key={a.id}>
                <button
                  onClick={() => setSelected(a)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-start shadow-[var(--shadow-card)] transition hover:bg-muted active:scale-[0.99]"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: SEV_COLOR[a.severity] }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold capitalize">{t(`sos.type.${a.alert_type}`)}</div>
                      <div className="text-xs font-medium text-muted-foreground">
                        {d.toFixed(1)} {t("map.distance")}
                      </div>
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {t(`severity.${a.severity}`)} • {new Date(a.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {selected && (
        <IncidentSheet
          alert={selected}
          distance={distanceTo(selected)}
          onClose={() => setSelected(null)}
          onHelp={() => {
            toast.success(t("map.helpThanks"));
            setSelected(null);
          }}
          t={t}
        />
      )}
    </div>
  );
}

function IncidentSheet({
  alert,
  distance,
  onClose,
  onHelp,
  t,
}: {
  alert: AlertRow;
  distance: number | null;
  onClose: () => void;
  onHelp: () => void;
  t: (k: string) => string;
}) {
  const Icon = TYPE_ICON[alert.alert_type];
  const color = SEV_COLOR[alert.severity];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${alert.latitude},${alert.longitude}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-card p-5 shadow-[var(--shadow-card)] animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-muted" />
        <div className="flex items-start gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
            style={{ backgroundColor: color }}
          >
            <Icon className="h-6 w-6" />
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-extrabold">{t(`sos.type.${alert.alert_type}`)}</h2>
            <div className="mt-1 flex flex-wrap gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {t(`severity.${alert.severity}`)}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
                {t(`status.${alert.status}`)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
            aria-label="close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {alert.description && (
          <p className="mt-4 rounded-xl bg-muted/50 p-3 text-sm leading-relaxed">
            {alert.description}
          </p>
        )}

        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span>{t("map.reported")}: {new Date(alert.created_at).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>
              {alert.latitude.toFixed(5)}, {alert.longitude.toFixed(5)}
              {distance !== null && ` • ${distance.toFixed(2)} ${t("map.distance")}`}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
          >
            <Navigation className="h-4 w-4" />
            {t("map.openInMaps")}
          </a>
          <button
            onClick={onHelp}
            className="flex items-center justify-center gap-2 rounded-xl bg-emergency py-3 text-sm font-bold text-emergency-foreground active:scale-95"
          >
            <HeartHandshake className="h-4 w-4" />
            {t("map.iCanHelp")}
          </button>
        </div>
      </div>
    </div>
  );
}
