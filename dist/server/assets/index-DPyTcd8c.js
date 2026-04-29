import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-BCiOq1yH.js";
import { a as useI18n, u as useAuth, s as supabase, t as toast } from "./router-Bo5vnDPi.js";
import { A as AppShell } from "./AppShell-CWx62ij6.js";
import { A as Activity, F as Flame, S as Shield, T as TriangleAlert } from "./triangle-alert-06PWKNbo.js";
import { C as Car, M as MapPin } from "./map-pin-B4Q21bxy.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const TYPES = [{
  id: "medical",
  icon: Activity,
  tone: "bg-info/15 text-info"
}, {
  id: "fire",
  icon: Flame,
  tone: "bg-emergency/15 text-emergency"
}, {
  id: "police",
  icon: Shield,
  tone: "bg-navy/15 text-navy"
}, {
  id: "accident",
  icon: Car,
  tone: "bg-warning/20 text-foreground"
}, {
  id: "other",
  icon: TriangleAlert,
  tone: "bg-muted text-foreground"
}];
function SosPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SosContent, {}) });
}
function SosContent() {
  const {
    t
  } = useI18n();
  const {
    user
  } = useAuth();
  const [type, setType] = reactExports.useState("medical");
  const [description, setDescription] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [coords, setCoords] = reactExports.useState(null);
  const sendSOS = async () => {
    if (!user) return;
    setBusy(true);
    try {
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) return reject(new Error("Geolocation unavailable"));
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 1e4
        });
      });
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setCoords({
        lat,
        lng
      });
      const {
        error
      } = await supabase.from("alerts").insert({
        user_id: user.id,
        alert_type: type,
        severity: "high",
        latitude: lat,
        longitude: lng,
        description: description.trim() || null
      });
      if (error) throw error;
      toast.success(t("sos.sent"));
      setDescription("");
    } catch (err) {
      toast.error(err?.message ?? t("sos.error"));
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold leading-tight", children: t("sos.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/70", children: t("sos.subtitle") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: TYPES.map(({
      id,
      icon: Icon,
      tone
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setType(id), className: `flex flex-col items-center gap-1 rounded-2xl p-3 text-xs font-medium transition ${type === id ? "ring-2 ring-emergency bg-card shadow-[var(--shadow-card)]" : "bg-card"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-10 w-10 items-center justify-center rounded-xl ${tone}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(`sos.type.${id}`) })
    ] }, id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: sendSOS, disabled: busy, className: "btn-emergency animate-sos relative flex h-48 w-48 flex-col items-center justify-center rounded-full text-white transition active:scale-95 disabled:opacity-70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-black tracking-wider", children: "SOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 text-xs font-medium uppercase tracking-widest opacity-90", children: busy ? t("sos.sending") : t("sos.button") })
      ] }),
      coords && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
        coords.lat.toFixed(4),
        ", ",
        coords.lng.toFixed(4)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: t("sos.describe"), maxLength: 500, rows: 3, className: "w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-emergency" })
  ] });
}
export {
  SosPage as component
};
