import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShieldCheck, Plus, Trash2, LogOut } from "lucide-react";
import { A as AppShell, u as useIsAdmin } from "./AppShell-BtAnQFby.js";
import { u as useAuth, a as useI18n, s as supabase } from "./router-CARJVMO8.js";
import "@radix-ui/react-dropdown-menu";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-router";
import "zod";
import "@supabase/supabase-js";
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
function ProfilePage() {
  const {
    user,
    signOut
  } = useAuth();
  const {
    t
  } = useI18n();
  const {
    isAdmin
  } = useIsAdmin();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({
      data
    }) => {
      if (data) {
        setFullName(data.full_name ?? "");
        setPhone(data.phone ?? "");
        setBloodType(data.blood_type ?? "");
        setAllergies(data.allergies ?? "");
        setMedicalNotes(data.medical_notes ?? "");
        const ec = data.emergency_contacts;
        if (Array.isArray(ec)) setContacts(ec);
      }
      setLoading(false);
    });
  }, [user]);
  const save = async () => {
    if (!user) return;
    setSaving(true);
    const {
      error
    } = await supabase.from("profiles").update({
      full_name: fullName.trim() || null,
      phone: phone.trim() || null,
      blood_type: bloodType || null,
      allergies: allergies.trim() || null,
      medical_notes: medicalNotes.trim() || null,
      emergency_contacts: contacts.filter((c) => c.name || c.phone)
    }).eq("id", user.id);
    setSaving(false);
    if (error) toast.error(t("profile.saveError"));
    else toast.success(t("profile.saved"));
  };
  const claimAdmin = async () => {
    const {
      data,
      error
    } = await supabase.rpc("claim_first_admin");
    if (error) return toast.error(error.message);
    if (data) {
      toast.success(t("profile.adminGranted"));
      setTimeout(() => window.location.reload(), 600);
    } else {
      toast.error(t("profile.adminTaken"));
    }
  };
  const addContact = () => setContacts((c) => [...c, {
    name: "",
    phone: "",
    relation: ""
  }]);
  const updateContact = (i, key, v) => setContacts((c) => c.map((x, idx) => idx === i ? {
    ...x,
    [key]: v
  } : x));
  const removeContact = (i) => setContacts((c) => c.filter((_, idx) => idx !== i));
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "py-10 text-center text-muted-foreground", children: "..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-3xl bg-hero p-6 text-navy-foreground shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-2xl font-bold", children: (fullName || user?.email || "?")[0]?.toUpperCase() }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("div", { className: "truncate text-lg font-bold", children: fullName || user?.email }),
        /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-white/70", children: user?.email }),
        isAdmin && /* @__PURE__ */ jsxs("div", { className: "mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3 w-3" }),
          " Admin"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsx(Field, { label: t("profile.fullName"), value: fullName, onChange: setFullName }),
      /* @__PURE__ */ jsx(Field, { label: t("profile.phone"), value: phone, onChange: setPhone, type: "tel" })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-foreground", children: t("profile.medical") }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: t("profile.bloodType") }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: BLOOD_TYPES.map((bt) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setBloodType(bt === bloodType ? "" : bt), className: `rounded-lg border px-3 py-1.5 text-sm font-medium transition ${bloodType === bt ? "border-emergency bg-emergency text-white" : "border-input bg-card text-foreground hover:border-muted-foreground"}`, children: bt }, bt)) })
      ] }),
      /* @__PURE__ */ jsx(Field, { label: t("profile.allergies"), value: allergies, onChange: setAllergies }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: t("profile.medicalNotes") }),
        /* @__PURE__ */ jsx("textarea", { value: medicalNotes, onChange: (e) => setMedicalNotes(e.target.value), rows: 3, maxLength: 500, className: "w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-emergency" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-foreground", children: t("profile.contacts") }),
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: addContact, className: "flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-navy-foreground", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }),
          " ",
          t("profile.addContact")
        ] })
      ] }),
      contacts.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "—" }),
      contacts.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-xl border border-border p-3", children: [
        /* @__PURE__ */ jsx(Field, { label: t("profile.contact.name"), value: c.name, onChange: (v) => updateContact(i, "name", v) }),
        /* @__PURE__ */ jsx(Field, { label: t("profile.contact.phone"), value: c.phone, onChange: (v) => updateContact(i, "phone", v), type: "tel" }),
        /* @__PURE__ */ jsx(Field, { label: t("profile.contact.relation"), value: c.relation, onChange: (v) => updateContact(i, "relation", v) }),
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => removeContact(i), className: "flex items-center gap-1 text-xs text-emergency", children: [
          /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }),
          " ",
          t("profile.removeContact")
        ] })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: save, disabled: saving, className: "w-full rounded-2xl bg-emergency py-3 text-sm font-bold text-emergency-foreground shadow-[var(--shadow-card)] active:scale-[0.99] disabled:opacity-60", children: saving ? "..." : t("profile.save") }),
    !isAdmin && /* @__PURE__ */ jsx("button", { onClick: claimAdmin, className: "w-full rounded-2xl border border-dashed border-border bg-card py-3 text-xs font-medium text-muted-foreground hover:bg-muted", children: t("profile.becomeAdmin") }),
    /* @__PURE__ */ jsxs("button", { onClick: () => signOut(), className: "flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted", children: [
      /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
      " ",
      t("auth.signOut")
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text"
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("input", { type, value, onChange: (e) => onChange(e.target.value), className: "w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-emergency" })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(ProfilePage, {}) });
export {
  SplitComponent as component
};
