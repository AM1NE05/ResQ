import { jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, HeartHandshake, Flame, Shield, Building2, Activity, Cross, XOctagon, AlertTriangle, Phone } from "lucide-react";
import { A as AppShell } from "./AppShell-BtAnQFby.js";
import { a as useI18n } from "./router-CARJVMO8.js";
import "react";
import "@radix-ui/react-dropdown-menu";
import "clsx";
import "tailwind-merge";
import "sonner";
import "@tanstack/react-router";
import "zod";
import "@supabase/supabase-js";
function HelpPage() {
  const {
    t
  } = useI18n();
  const partners = [{
    icon: Flame,
    key: "help.partner.protection",
    tone: "bg-emergency/15 text-emergency"
  }, {
    icon: Shield,
    key: "help.partner.police",
    tone: "bg-navy/15 text-navy"
  }, {
    icon: Building2,
    key: "help.partner.guard",
    tone: "bg-navy/15 text-navy"
  }, {
    icon: Activity,
    key: "help.partner.samu",
    tone: "bg-info/15 text-info"
  }, {
    icon: Cross,
    key: "help.partner.redcrescent",
    tone: "bg-emergency/15 text-emergency"
  }];
  const numbers = [{
    key: "help.emergency.police",
    num: "197"
  }, {
    key: "help.emergency.protection",
    num: "198"
  }, {
    key: "help.emergency.samu",
    num: "190"
  }, {
    key: "help.emergency.guard",
    num: "193"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold", children: t("help.title") }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-white/70", children: "ResQ Najda" })
    ] }),
    /* @__PURE__ */ jsx(Section, { icon: BookOpen, title: t("help.manual"), tone: "bg-info/15 text-info", children: /* @__PURE__ */ jsx("ol", { className: "space-y-3", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground", children: n }),
      /* @__PURE__ */ jsx("span", { className: "text-sm leading-relaxed", children: t(`help.manual.${n}`) })
    ] }, n)) }) }),
    /* @__PURE__ */ jsx(Section, { icon: HeartHandshake, title: t("help.partners"), tone: "bg-success/15 text-success", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2", children: partners.map(({
      icon: Icon,
      key,
      tone
    }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3", children: [
      /* @__PURE__ */ jsx("span", { className: `flex h-10 w-10 items-center justify-center rounded-xl ${tone}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: t(key) })
    ] }, key)) }) }),
    /* @__PURE__ */ jsx(Section, { icon: XOctagon, title: t("help.dont"), tone: "bg-emergency/15 text-emergency", children: /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2 text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "text-emergency", children: "✕" }),
      /* @__PURE__ */ jsx("span", { children: t(`help.dont.${n}`) })
    ] }, n)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-emergency/40 bg-emergency/5 p-5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-6 w-6 text-emergency" }),
        /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-emergency", children: t("help.danger") })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-foreground", children: t("help.danger.body") })
    ] }),
    /* @__PURE__ */ jsx(Section, { icon: Phone, title: t("help.emergency.title"), tone: "bg-warning/30 text-foreground", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: numbers.map(({
      key,
      num
    }) => /* @__PURE__ */ jsxs("a", { href: `tel:${num}`, className: "flex flex-col items-center justify-center rounded-xl bg-navy py-4 text-navy-foreground active:scale-95 transition", children: [
      /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold", children: num }),
      /* @__PURE__ */ jsx("span", { className: "mt-1 text-[10px] opacity-80", children: t(key).split(":")[0] })
    ] }, num)) }) })
  ] });
}
function Section({
  icon: Icon,
  title,
  tone,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: `flex h-8 w-8 items-center justify-center rounded-lg ${tone}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold", children: title })
    ] }),
    children
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(HelpPage, {}) });
export {
  SplitComponent as component
};
