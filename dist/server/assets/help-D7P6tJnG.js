import { U as jsxRuntimeExports } from "./worker-entry-BCiOq1yH.js";
import { c as createLucideIcon, A as AppShell } from "./AppShell-CWx62ij6.js";
import { a as useI18n } from "./router-Bo5vnDPi.js";
import { H as HeartHandshake } from "./heart-handshake-CfvmBRA4.js";
import { F as Flame, S as Shield, A as Activity, T as TriangleAlert } from "./triangle-alert-06PWKNbo.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",
      key: "1xbrqy"
    }
  ]
];
const Cross = createLucideIcon("cross", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const OctagonX = createLucideIcon("octagon-x", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("help.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/70", children: "ResQ Najda" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: BookOpen, title: t("help.manual"), tone: "bg-info/15 text-info", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground", children: n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-relaxed", children: t(`help.manual.${n}`) })
    ] }, n)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: HeartHandshake, title: t("help.partners"), tone: "bg-success/15 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2", children: partners.map(({
      icon: Icon,
      key,
      tone
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-10 w-10 items-center justify-center rounded-xl ${tone}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t(key) })
    ] }, key)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: OctagonX, title: t("help.dont"), tone: "bg-emergency/15 text-emergency", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emergency", children: "✕" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t(`help.dont.${n}`) })
    ] }, n)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-2 border-emergency/40 bg-emergency/5 p-5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-6 w-6 text-emergency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-emergency", children: t("help.danger") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-foreground", children: t("help.danger.body") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: Phone, title: t("help.emergency.title"), tone: "bg-warning/30 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: numbers.map(({
      key,
      num
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${num}`, className: "flex flex-col items-center justify-center rounded-xl bg-navy py-4 text-navy-foreground active:scale-95 transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-extrabold", children: num }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 text-[10px] opacity-80", children: t(key).split(":")[0] })
    ] }, num)) }) })
  ] });
}
function Section({
  icon: Icon,
  title,
  tone,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-8 w-8 items-center justify-center rounded-lg ${tone}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold", children: title })
    ] }),
    children
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HelpPage, {}) });
export {
  SplitComponent as component
};
