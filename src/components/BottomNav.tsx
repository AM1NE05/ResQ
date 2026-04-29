import { Link, useLocation } from "@tanstack/react-router";
import { Siren, Map, Video, User, ShieldCheck, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useIsAdmin } from "@/lib/useIsAdmin";

export function BottomNav() {
  const { t } = useI18n();
  const loc = useLocation();
  const { isAdmin } = useIsAdmin();

  const left = [
    { to: "/feed", icon: Video, label: t("nav.feed") },
    { to: "/map", icon: Map, label: t("nav.map") },
  ];
  const right = [
    { to: "/profile", icon: User, label: t("nav.profile") },
    { to: "/help", icon: HelpCircle, label: t("nav.help") },
    ...(isAdmin ? [{ to: "/admin", icon: ShieldCheck, label: t("nav.admin") }] : []),
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex max-w-md items-end justify-around px-4 pb-3 pt-2">
        {left.map((item) => (
          <NavItem key={item.to} item={item} active={loc.pathname === item.to} />
        ))}
        <li className="-mt-6">
          <Link
            to="/"
            className={`flex h-16 w-16 flex-col items-center justify-center rounded-full btn-emergency transition active:scale-95 ${
              loc.pathname === "/" ? "ring-emergency" : ""
            }`}
          >
            <Siren className="h-7 w-7" />
          </Link>
        </li>
        {right.map((item) => (
          <NavItem key={item.to} item={item} active={loc.pathname === item.to} />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({
  item,
  active,
}: {
  item: { to: string; icon: typeof Siren; label: string };
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        to={item.to}
        className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[11px] transition ${
          active ? "text-emergency font-semibold" : "text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
        {item.label}
      </Link>
    </li>
  );
}
