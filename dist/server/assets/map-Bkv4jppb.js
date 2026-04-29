import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { toast } from "sonner";
import { A as AppShell } from "./AppShell-BtAnQFby.js";
import { a as useI18n, s as supabase } from "./router-CARJVMO8.js";
import { AlertTriangle, Car, Shield, Flame, Activity, X, Clock, MapPin, Navigation, HeartHandshake } from "lucide-react";
import "@radix-ui/react-dropdown-menu";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-router";
import "zod";
import "@supabase/supabase-js";
const SEV_COLOR = {
  low: "#62a96b",
  medium: "#e4a23a",
  high: "#e8553a",
  critical: "#c41e3a"
};
const TYPE_ICON = {
  medical: Activity,
  fire: Flame,
  police: Shield,
  accident: Car,
  other: AlertTriangle
};
function distanceKm(a, b) {
  const R = 6371;
  const toRad = (x2) => x2 * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
function pinIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:34px;height:42px"><div style="position:absolute;inset:0;background:${color};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 10px rgba(0,0,0,.25)"></div><div style="position:absolute;top:8px;left:8px;width:18px;height:18px;background:white;border-radius:50%"></div></div>`,
    iconSize: [34, 42],
    iconAnchor: [17, 38]
  });
}
function CenterOn({
  pos
}) {
  const map = useMap();
  useEffect(() => {
    if (pos) map.setView([pos.lat, pos.lng], 13);
  }, [pos, map]);
  return null;
}
function MapPage() {
  const {
    t
  } = useI18n();
  const [alerts, setAlerts] = useState([]);
  const [me, setMe] = useState(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => setMe({
        lat: p.coords.latitude,
        lng: p.coords.longitude
      }), () => setMe({
        lat: 36.8065,
        lng: 10.1815
      }), {
        enableHighAccuracy: true,
        timeout: 8e3
      });
    } else {
      setMe({
        lat: 36.8065,
        lng: 10.1815
      });
    }
  }, []);
  useEffect(() => {
    const load = async () => {
      const {
        data
      } = await supabase.from("alerts").select("*").neq("status", "resolved").order("created_at", {
        ascending: false
      }).limit(200);
      if (data) setAlerts(data);
    };
    load();
    const ch = supabase.channel("alerts-stream").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "alerts"
    }, load).subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);
  const sorted = useMemo(() => {
    const wrapped = alerts.map((a) => ({
      a,
      d: me ? distanceKm(me, {
        lat: a.latitude,
        lng: a.longitude
      }) : 0
    }));
    if (me) wrapped.sort((x, y) => x.d - y.d);
    return wrapped;
  }, [alerts, me]);
  const center = me ?? {
    lat: 36.8065,
    lng: 10.1815
  };
  const distanceTo = (a) => me ? distanceKm(me, {
    lat: a.latitude,
    lng: a.longitude
  }) : null;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold", children: t("map.title") }),
    /* @__PURE__ */ jsx("div", { className: "h-72 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxs(MapContainer, { center: [center.lat, center.lng], zoom: 12, scrollWheelZoom: true, children: [
      /* @__PURE__ */ jsx(TileLayer, { attribution: "© OpenStreetMap", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
      /* @__PURE__ */ jsx(CenterOn, { pos: me }),
      me && /* @__PURE__ */ jsx(Marker, { position: [me.lat, me.lng], icon: pinIcon("#1a4ed8") }),
      alerts.map((a) => /* @__PURE__ */ jsx(Marker, { position: [a.latitude, a.longitude], icon: pinIcon(SEV_COLOR[a.severity]), eventHandlers: {
        click: () => setSelected(a)
      } }, a.id))
    ] }) }),
    sorted.length === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground", children: t("map.empty") }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: sorted.map(({
      a,
      d
    }) => {
      const Icon = TYPE_ICON[a.alert_type];
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { onClick: () => setSelected(a), className: "flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-start shadow-[var(--shadow-card)] transition hover:bg-muted active:scale-[0.99]", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl text-white", style: {
          backgroundColor: SEV_COLOR[a.severity]
        }, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold capitalize", children: t(`sos.type.${a.alert_type}`) }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-medium text-muted-foreground", children: [
              d.toFixed(1),
              " ",
              t("map.distance")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "truncate text-xs text-muted-foreground", children: [
            t(`severity.${a.severity}`),
            " • ",
            new Date(a.created_at).toLocaleTimeString()
          ] })
        ] })
      ] }) }, a.id);
    }) }),
    selected && /* @__PURE__ */ jsx(IncidentSheet, { alert: selected, distance: distanceTo(selected), onClose: () => setSelected(null), onHelp: () => {
      toast.success(t("map.helpThanks"));
      setSelected(null);
    }, t })
  ] });
}
function IncidentSheet({
  alert,
  distance,
  onClose,
  onHelp,
  t
}) {
  const Icon = TYPE_ICON[alert.alert_type];
  const color = SEV_COLOR[alert.severity];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${alert.latitude},${alert.longitude}`;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md rounded-t-3xl bg-card p-5 shadow-[var(--shadow-card)] animate-in slide-in-from-bottom", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 h-1.5 w-12 rounded-full bg-muted" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white", style: {
        backgroundColor: color
      }, children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-extrabold", children: t(`sos.type.${alert.alert_type}`) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "rounded-full px-2 py-0.5 text-[11px] font-bold text-white", style: {
            backgroundColor: color
          }, children: t(`severity.${alert.severity}`) }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium", children: t(`status.${alert.status}`) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted", "aria-label": "close", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
    ] }),
    alert.description && /* @__PURE__ */ jsx("p", { className: "mt-4 rounded-xl bg-muted/50 p-3 text-sm leading-relaxed", children: alert.description }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxs("span", { children: [
          t("map.reported"),
          ": ",
          new Date(alert.created_at).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxs("span", { children: [
          alert.latitude.toFixed(5),
          ", ",
          alert.longitude.toFixed(5),
          distance !== null && ` • ${distance.toFixed(2)} ${t("map.distance")}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxs("a", { href: mapsUrl, target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted", children: [
        /* @__PURE__ */ jsx(Navigation, { className: "h-4 w-4" }),
        t("map.openInMaps")
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: onHelp, className: "flex items-center justify-center gap-2 rounded-xl bg-emergency py-3 text-sm font-bold text-emergency-foreground active:scale-95", children: [
        /* @__PURE__ */ jsx(HeartHandshake, { className: "h-4 w-4" }),
        t("map.iCanHelp")
      ] })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(MapPage, {}) });
export {
  SplitComponent as component
};
