import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/client";
import { useI18n } from "@/lib/i18n";
import { LogoLockup } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
  fullName: z.string().trim().max(100).optional(),
});

export function AuthScreen() {
  const { t } = useI18n();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
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
            data: { full_name: parsed.data.fullName ?? "" },
          },
        });
        if (error) throw error;
        toast.success("✓");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message ?? "Auth error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-hero text-navy-foreground">
      <div className="flex items-center justify-between p-4">
        <LogoLockup />
        <LanguageSwitcher variant="dark" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold leading-tight">{t("auth.welcome")}</h1>
            <p className="mt-2 text-sm text-white/70">{t("auth.sub")}</p>
          </div>

          <form onSubmit={submit} className="space-y-3 rounded-3xl bg-card/95 p-6 text-foreground shadow-[var(--shadow-elevated)] backdrop-blur-xl">
            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-sm font-medium">{t("auth.fullName")}</label>
                <input
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-emergency"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium">{t("auth.email")}</label>
              <input
                type="email"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-emergency"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{t("auth.password")}</label>
              <input
                type="password"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-emergency"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="btn-emergency w-full rounded-xl py-3 text-base font-bold transition active:scale-[0.98] disabled:opacity-60"
            >
              {busy ? t("auth.loading") : mode === "signin" ? t("auth.signIn") : t("auth.signUp")}
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="block w-full pt-2 text-center text-sm text-muted-foreground hover:text-foreground"
            >
              {mode === "signin" ? t("auth.toSignUp") : t("auth.toSignIn")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
