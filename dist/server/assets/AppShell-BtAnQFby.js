import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { a as useI18n, u as useAuth, s as supabase } from "./router-CARJVMO8.js";
import { ChevronRight, Check, Circle, Globe, Siren, Bell, CheckCheck, Video, Map, User, HelpCircle, ShieldCheck } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { useLocation, Link } from "@tanstack/react-router";
import { z } from "zod";
const logoImg = "/assets/resq-logo-BV2EFOQz.png";
function Logo({ className = "h-10 w-10" }) {
  return /* @__PURE__ */ jsx("img", { src: logoImg, alt: "ResQ Najda", className: `${className} object-contain` });
}
function LogoLockup({ className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsx(Logo, { className: "h-9 w-9" }),
    /* @__PURE__ */ jsxs("span", { className: "text-lg font-extrabold tracking-tight text-navy-foreground", children: [
      "ResQ ",
      /* @__PURE__ */ jsx("span", { className: "text-emergency", children: "نجدة" })
    ] })
  ] });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const LANGS = [
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" }
];
function LanguageSwitcher({ variant = "light" }) {
  const { lang, setLang } = useI18n();
  const cls = variant === "dark" ? "text-navy-foreground hover:bg-white/10" : "text-foreground hover:bg-accent";
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxs(
      DropdownMenuTrigger,
      {
        className: `inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition ${cls}`,
        children: [
          /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" }),
          lang.toUpperCase()
        ]
      }
    ),
    /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", children: LANGS.map((l) => /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setLang(l.code), className: lang === l.code ? "font-bold" : "", children: l.label }, l.code)) })
  ] });
}
function NotificationsBell() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!user) return;
    let active = true;
    const load = async () => {
      const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(20);
      if (active && data) setItems(data);
    };
    load();
    const channel = supabase.channel(`notif:${user.id}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
      (payload) => {
        const n = payload.new;
        setItems((prev) => [n, ...prev]);
        toast.success(t(`notif.${n.title}.title`), {
          description: t(`notif.${n.title}.body`),
          icon: /* @__PURE__ */ jsx(Siren, { className: "h-4 w-4" })
        });
      }
    ).subscribe();
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
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          setOpen((o) => !o);
          if (!open) markAllRead();
        },
        className: "relative rounded-full p-2 text-navy-foreground hover:bg-white/10",
        "aria-label": "notifications",
        children: [
          /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5" }),
          unread > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emergency px-1 text-[10px] font-bold text-emergency-foreground", children: unread })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute end-0 mt-2 z-50 w-80 max-w-[90vw] rounded-2xl bg-card text-card-foreground shadow-[var(--shadow-elevated)] overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: t("notif.title") }),
          /* @__PURE__ */ jsx(CheckCheck, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-h-96 overflow-y-auto", children: [
          items.length === 0 && /* @__PURE__ */ jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: t("notif.empty") }),
          items.map((n) => /* @__PURE__ */ jsxs("div", { className: `flex gap-3 border-b border-border px-4 py-3 ${!n.read ? "bg-emergency/5" : ""}`, children: [
            /* @__PURE__ */ jsx(Siren, { className: "mt-0.5 h-5 w-5 flex-shrink-0 text-emergency" }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: t(`notif.${n.title}.title`) }),
              /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: t(`notif.${n.title}.body`) }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[10px] text-muted-foreground", children: new Date(n.created_at).toLocaleString() })
            ] })
          ] }, n.id))
        ] })
      ] })
    ] })
  ] });
}
function AppHeader() {
  const { user } = useAuth();
  return /* @__PURE__ */ jsx("header", { className: "bg-navy-gradient", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-md items-center justify-between px-4 py-3", children: [
    /* @__PURE__ */ jsx(LogoLockup, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(LanguageSwitcher, { variant: "dark" }),
      user && /* @__PURE__ */ jsx(NotificationsBell, {})
    ] })
  ] }) });
}
function useIsAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle().then(({ data }) => {
      if (!cancelled) {
        setIsAdmin(!!data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [user]);
  return { isAdmin, loading };
}
function BottomNav() {
  const { t } = useI18n();
  const loc = useLocation();
  const { isAdmin } = useIsAdmin();
  const left = [
    { to: "/feed", icon: Video, label: t("nav.feed") },
    { to: "/map", icon: Map, label: t("nav.map") }
  ];
  const right = [
    { to: "/profile", icon: User, label: t("nav.profile") },
    { to: "/help", icon: HelpCircle, label: t("nav.help") },
    ...isAdmin ? [{ to: "/admin", icon: ShieldCheck, label: t("nav.admin") }] : []
  ];
  return /* @__PURE__ */ jsx("nav", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md", children: /* @__PURE__ */ jsxs("ul", { className: "mx-auto flex max-w-md items-end justify-around px-4 pb-3 pt-2", children: [
    left.map((item) => /* @__PURE__ */ jsx(NavItem, { item, active: loc.pathname === item.to }, item.to)),
    /* @__PURE__ */ jsx("li", { className: "-mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: `flex h-16 w-16 flex-col items-center justify-center rounded-full btn-emergency transition active:scale-95 ${loc.pathname === "/" ? "ring-emergency" : ""}`,
        children: /* @__PURE__ */ jsx(Siren, { className: "h-7 w-7" })
      }
    ) }),
    right.map((item) => /* @__PURE__ */ jsx(NavItem, { item, active: loc.pathname === item.to }, item.to))
  ] }) });
}
function NavItem({
  item,
  active
}) {
  const Icon = item.icon;
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
    Link,
    {
      to: item.to,
      className: `flex flex-col items-center gap-0.5 px-2 py-1 text-[11px] transition ${active ? "text-emergency font-semibold" : "text-muted-foreground"}`,
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }),
        item.label
      ]
    }
  ) });
}
const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
  fullName: z.string().trim().max(100).optional()
});
function AuthScreen() {
  const { t } = useI18n();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, fullName });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: parsed.data.fullName ?? "" }
          }
        });
        if (error) throw error;
        toast.success("✓");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password
        });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err.message ?? "Auth error");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-hero text-navy-foreground", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4", children: [
      /* @__PURE__ */ jsx(LogoLockup, {}),
      /* @__PURE__ */ jsx(LanguageSwitcher, { variant: "dark" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center justify-center px-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold leading-tight", children: t("auth.welcome") }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/70", children: t("auth.sub") })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-3 rounded-3xl bg-card/95 p-6 text-foreground shadow-[var(--shadow-elevated)] backdrop-blur-xl", children: [
        mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium", children: t("auth.fullName") }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-emergency",
              value: fullName,
              onChange: (e) => setFullName(e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium", children: t("auth.email") }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-emergency",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium", children: t("auth.password") }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-emergency",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              minLength: 6
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: busy,
            className: "btn-emergency w-full rounded-xl py-3 text-base font-bold transition active:scale-[0.98] disabled:opacity-60",
            children: busy ? t("auth.loading") : mode === "signin" ? t("auth.signIn") : t("auth.signUp")
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
            className: "block w-full pt-2 text-center text-sm text-muted-foreground hover:text-foreground",
            children: mode === "signin" ? t("auth.toSignUp") : t("auth.toSignIn")
          }
        )
      ] })
    ] }) })
  ] });
}
function AppShell({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-hero", children: /* @__PURE__ */ jsx(Logo, { className: "h-16 w-16 animate-pulse" }) });
  }
  if (!user) return /* @__PURE__ */ jsx(AuthScreen, {});
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(AppHeader, {}),
    /* @__PURE__ */ jsx("main", { className: "mx-auto max-w-md px-4 pb-28 pt-4", children }),
    /* @__PURE__ */ jsx(BottomNav, {})
  ] });
}
export {
  AppShell as A,
  useIsAdmin as u
};
