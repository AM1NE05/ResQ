import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  HeartHandshake,
  XOctagon,
  AlertTriangle,
  Phone,
  Shield,
  Flame,
  Activity,
  Cross,
  Building2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "ResQ Najda — Help & info" },
      { name: "description", content: "How to use ResQ Najda, our partners, rules, and emergency numbers." },
    ],
  }),
  component: () => (
    <AppShell>
      <HelpPage />
    </AppShell>
  ),
});

function HelpPage() {
  const { t } = useI18n();

  const partners = [
    { icon: Flame, key: "help.partner.protection", tone: "bg-emergency/15 text-emergency" },
    { icon: Shield, key: "help.partner.police", tone: "bg-navy/15 text-navy" },
    { icon: Building2, key: "help.partner.guard", tone: "bg-navy/15 text-navy" },
    { icon: Activity, key: "help.partner.samu", tone: "bg-info/15 text-info" },
    { icon: Cross, key: "help.partner.redcrescent", tone: "bg-emergency/15 text-emergency" },
  ];

  const numbers = [
    { key: "help.emergency.police", num: "197" },
    { key: "help.emergency.protection", num: "198" },
    { key: "help.emergency.samu", num: "190" },
    { key: "help.emergency.guard", num: "193" },
  ];

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]">
        <h1 className="text-2xl font-extrabold">{t("help.title")}</h1>
        <p className="mt-1 text-sm text-white/70">ResQ Najda</p>
      </div>

      {/* Manual */}
      <Section icon={BookOpen} title={t("help.manual")} tone="bg-info/15 text-info">
        <ol className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                {n}
              </span>
              <span className="text-sm leading-relaxed">{t(`help.manual.${n}`)}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Partners */}
      <Section icon={HeartHandshake} title={t("help.partners")} tone="bg-success/15 text-success">
        <div className="grid grid-cols-1 gap-2">
          {partners.map(({ icon: Icon, key, tone }) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{t(key)}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* What you should NOT do */}
      <Section icon={XOctagon} title={t("help.dont")} tone="bg-emergency/15 text-emergency">
        <ul className="space-y-2">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex gap-2 text-sm">
              <span className="text-emergency">✕</span>
              <span>{t(`help.dont.${n}`)}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Why fake alerts are dangerous */}
      <div className="rounded-2xl border-2 border-emergency/40 bg-emergency/5 p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-emergency" />
          <h2 className="text-base font-bold text-emergency">{t("help.danger")}</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{t("help.danger.body")}</p>
      </div>

      {/* Emergency numbers */}
      <Section icon={Phone} title={t("help.emergency.title")} tone="bg-warning/30 text-foreground">
        <div className="grid grid-cols-2 gap-2">
          {numbers.map(({ key, num }) => (
            <a
              key={num}
              href={`tel:${num}`}
              className="flex flex-col items-center justify-center rounded-xl bg-navy py-4 text-navy-foreground active:scale-95 transition"
            >
              <span className="text-3xl font-extrabold">{num}</span>
              <span className="mt-1 text-[10px] opacity-80">{t(key).split(":")[0]}</span>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: typeof BookOpen;
  title: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center gap-2">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}>
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
