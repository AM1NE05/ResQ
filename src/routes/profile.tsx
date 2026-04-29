import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/client";
import { useIsAdmin } from "@/lib/useIsAdmin";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "ResQ Najda — Profile" }] }),
  component: () => (
    <AppShell>
      <ProfilePage />
    </AppShell>
  ),
});

interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function ProfilePage() {
  const { user, signOut } = useAuth();
  const { t } = useI18n();
  const { isAdmin } = useIsAdmin();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setFullName(data.full_name ?? "");
          setPhone(data.phone ?? "");
          setBloodType(data.blood_type ?? "");
          setAllergies(data.allergies ?? "");
          setMedicalNotes(data.medical_notes ?? "");
          const ec = data.emergency_contacts as unknown;
          if (Array.isArray(ec)) setContacts(ec as EmergencyContact[]);
        }
        setLoading(false);
      });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        phone: phone.trim() || null,
        blood_type: bloodType || null,
        allergies: allergies.trim() || null,
        medical_notes: medicalNotes.trim() || null,
        emergency_contacts: contacts.filter((c) => c.name || c.phone) as unknown as never,
      })
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error(t("profile.saveError"));
    else toast.success(t("profile.saved"));
  };

  const claimAdmin = async () => {
    const { data, error } = await supabase.rpc("claim_first_admin");
    if (error) return toast.error(error.message);
    if (data) {
      toast.success(t("profile.adminGranted"));
      setTimeout(() => window.location.reload(), 600);
    } else {
      toast.error(t("profile.adminTaken"));
    }
  };

  const addContact = () =>
    setContacts((c) => [...c, { name: "", phone: "", relation: "" }]);
  const updateContact = (i: number, key: keyof EmergencyContact, v: string) =>
    setContacts((c) => c.map((x, idx) => (idx === i ? { ...x, [key]: v } : x)));
  const removeContact = (i: number) =>
    setContacts((c) => c.filter((_, idx) => idx !== i));

  if (loading) {
    return <div className="py-10 text-center text-muted-foreground">...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-2xl font-bold">
            {(fullName || user?.email || "?")[0]?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-lg font-bold">
              {fullName || user?.email}
            </div>
            <div className="truncate text-xs text-white/70">{user?.email}</div>
            {isAdmin && (
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs">
                <ShieldCheck className="h-3 w-3" /> Admin
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Identity */}
      <section className="space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
        <Field label={t("profile.fullName")} value={fullName} onChange={setFullName} />
        <Field label={t("profile.phone")} value={phone} onChange={setPhone} type="tel" />
      </section>

      {/* Medical */}
      <section className="space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-bold text-foreground">{t("profile.medical")}</h2>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            {t("profile.bloodType")}
          </label>
          <div className="flex flex-wrap gap-2">
            {BLOOD_TYPES.map((bt) => (
              <button
                key={bt}
                type="button"
                onClick={() => setBloodType(bt === bloodType ? "" : bt)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                  bloodType === bt
                    ? "border-emergency bg-emergency text-white"
                    : "border-input bg-card text-foreground hover:border-muted-foreground"
                }`}
              >
                {bt}
              </button>
            ))}
          </div>
        </div>
        <Field
          label={t("profile.allergies")}
          value={allergies}
          onChange={setAllergies}
        />
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            {t("profile.medicalNotes")}
          </label>
          <textarea
            value={medicalNotes}
            onChange={(e) => setMedicalNotes(e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-emergency"
          />
        </div>
      </section>

      {/* Contacts */}
      <section className="space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">{t("profile.contacts")}</h2>
          <button
            type="button"
            onClick={addContact}
            className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-navy-foreground"
          >
            <Plus className="h-3 w-3" /> {t("profile.addContact")}
          </button>
        </div>
        {contacts.length === 0 && (
          <p className="text-xs text-muted-foreground">—</p>
        )}
        {contacts.map((c, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-border p-3">
            <Field label={t("profile.contact.name")} value={c.name} onChange={(v) => updateContact(i, "name", v)} />
            <Field label={t("profile.contact.phone")} value={c.phone} onChange={(v) => updateContact(i, "phone", v)} type="tel" />
            <Field label={t("profile.contact.relation")} value={c.relation} onChange={(v) => updateContact(i, "relation", v)} />
            <button
              type="button"
              onClick={() => removeContact(i)}
              className="flex items-center gap-1 text-xs text-emergency"
            >
              <Trash2 className="h-3 w-3" /> {t("profile.removeContact")}
            </button>
          </div>
        ))}
      </section>

      <button
        onClick={save}
        disabled={saving}
        className="w-full rounded-2xl bg-emergency py-3 text-sm font-bold text-emergency-foreground shadow-[var(--shadow-card)] active:scale-[0.99] disabled:opacity-60"
      >
        {saving ? "..." : t("profile.save")}
      </button>

      {!isAdmin && (
        <button
          onClick={claimAdmin}
          className="w-full rounded-2xl border border-dashed border-border bg-card py-3 text-xs font-medium text-muted-foreground hover:bg-muted"
        >
          {t("profile.becomeAdmin")}
        </button>
      )}

      <button
        onClick={() => signOut()}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
      >
        <LogOut className="h-4 w-4" /> {t("auth.signOut")}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-emergency"
      />
    </div>
  );
}
