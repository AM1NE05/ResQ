import { jsx, jsxs } from "react/jsx-runtime";
import { createRootRoute, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Toaster as Toaster$1 } from "sonner";
const TRANSLATIONS = {
  ar: {
    "app.name": "ResQ نجدة",
    "app.tagline": "نجدتك على بُعد ضغطة زر",
    "nav.sos": "الطوارئ",
    "nav.map": "الخريطة",
    "nav.feed": "البلاغات",
    "nav.profile": "حسابي",
    "nav.admin": "لوحة التحكم",
    "auth.welcome": "مرحبا بك في ResQ نجدة",
    "auth.sub": "سجل الدخول لطلب المساعدة بسرعة",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.fullName": "الاسم الكامل",
    "auth.signIn": "تسجيل الدخول",
    "auth.signUp": "إنشاء حساب",
    "auth.toSignUp": "ليس لديك حساب؟ سجل الآن",
    "auth.toSignIn": "لديك حساب بالفعل؟ سجل الدخول",
    "auth.signOut": "تسجيل الخروج",
    "auth.loading": "جاري...",
    "sos.title": "اضغط على الزر في حالة الطوارئ",
    "sos.subtitle": "سيتم إرسال موقعك تلقائيا للسلطات",
    "sos.button": "نجدة!",
    "sos.sending": "جاري الإرسال...",
    "sos.sent": "تم إرسال بلاغك بنجاح",
    "sos.error": "تعذر إرسال البلاغ",
    "sos.type.medical": "طبي",
    "sos.type.fire": "حريق",
    "sos.type.police": "شرطة",
    "sos.type.accident": "حادث",
    "sos.type.other": "آخر",
    "sos.describe": "وصف الحالة (اختياري)",
    "sos.locating": "جاري تحديد الموقع...",
    "sos.location.fail": "تعذر تحديد الموقع",
    "map.title": "البلاغات القريبة",
    "map.empty": "لا توجد بلاغات حاليا",
    "map.distance": "كم",
    "feed.title": "بلاغات المواطنين",
    "feed.upload": "رفع فيديو",
    "feed.like": "إعجاب",
    "feed.comment": "تعليق",
    "feed.donate": "تبرع",
    "feed.empty": "لا توجد فيديوهات بعد. كن أول من يشارك بلاغا.",
    "upload.title": "عنوان البلاغ",
    "upload.description": "وصف",
    "upload.video": "اختر فيديو",
    "upload.submit": "نشر البلاغ",
    "upload.uploading": "جاري الرفع...",
    "comments.placeholder": "اكتب تعليقا...",
    "comments.send": "إرسال",
    "donate.thanks": "شكرا على دعمك! (نموذج تجريبي)",
    "severity.low": "منخفض",
    "severity.medium": "متوسط",
    "severity.high": "عالي",
    "severity.critical": "حرج",
    "common.cancel": "إلغاء",
    "common.close": "إغلاق",
    "lang.label": "اللغة",
    "profile.medical": "المعلومات الطبية",
    "profile.bloodType": "فصيلة الدم",
    "profile.allergies": "الحساسية",
    "profile.medicalNotes": "ملاحظات طبية",
    "profile.fullName": "الاسم الكامل",
    "profile.phone": "رقم الهاتف",
    "profile.contacts": "أرقام الطوارئ",
    "profile.contact.name": "الاسم",
    "profile.contact.phone": "الهاتف",
    "profile.contact.relation": "صلة القرابة",
    "profile.addContact": "إضافة جهة اتصال",
    "profile.removeContact": "حذف",
    "profile.save": "حفظ التغييرات",
    "profile.saved": "تم الحفظ بنجاح",
    "profile.saveError": "تعذر الحفظ",
    "profile.becomeAdmin": "الحصول على صلاحيات المسؤول (للتجربة)",
    "profile.adminGranted": "تم منحك صلاحيات المسؤول",
    "profile.adminTaken": "يوجد مسؤول مسبقا",
    "admin.title": "لوحة التحكم",
    "admin.stats.users": "المستخدمون",
    "admin.stats.alerts": "البلاغات",
    "admin.stats.pending": "قيد الانتظار",
    "admin.stats.complaints": "الفيديوهات",
    "admin.stats.uploaders": "الناشرون",
    "admin.stats.today": "اليوم",
    "admin.stats.week": "هذا الأسبوع",
    "admin.alerts.title": "بلاغات الطوارئ الواردة",
    "admin.alerts.empty": "لا توجد بلاغات",
    "admin.markResolved": "تم الحل",
    "admin.markDispatched": "أرسل فريق",
    "admin.notAdmin": "ليس لديك صلاحيات الوصول إلى هذه الصفحة",
    "status.pending": "قيد الانتظار",
    "status.dispatched": "تم الإرسال",
    "status.resolved": "تم الحل",
    "status.cancelled": "ملغى",
    "nav.help": "المساعدة",
    "map.details": "تفاصيل البلاغ",
    "map.iCanHelp": "أستطيع المساعدة",
    "map.helpThanks": "شكرا! سيتم إعلام الفريق بأنك في طريقك",
    "map.openInMaps": "فتح في الخرائط",
    "map.reported": "تم الإبلاغ",
    "help.title": "المساعدة والمعلومات",
    "help.manual": "كيفية استخدام التطبيق",
    "help.manual.1": "اضغط على زر SOS الكبير في حالة الطوارئ لإرسال موقعك تلقائيا.",
    "help.manual.2": "تصفح الخريطة لرؤية البلاغات القريبة وساعد إذا استطعت.",
    "help.manual.3": "شارك بلاغاتك بفيديو في صفحة البلاغات لزيادة الوعي.",
    "help.manual.4": "حدّث ملفك الطبي حتى تساعد المسعفين عند الحاجة.",
    "help.partners": "شركاؤنا",
    "help.partner.protection": "الحماية المدنية",
    "help.partner.police": "الشرطة الوطنية",
    "help.partner.guard": "الحرس الوطني",
    "help.partner.samu": "SAMU - الإسعاف الطبي",
    "help.partner.redcrescent": "الهلال الأحمر التونسي",
    "help.dont": "ما يجب تجنبه",
    "help.dont.1": "لا ترسل بلاغات كاذبة أو مزحة.",
    "help.dont.2": "لا ترفع فيديوهات تحتوي على عنف أو إساءة.",
    "help.dont.3": "لا تشارك معلومات شخصية لأشخاص آخرين دون إذنهم.",
    "help.dont.4": "لا تستخدم التطبيق لأغراض غير الطوارئ الحقيقية.",
    "help.danger": "خطورة البلاغات الكاذبة",
    "help.danger.body": "البلاغ الكاذب يستهلك موارد الطوارئ ويؤخر المساعدة عن أشخاص يحتاجونها فعلا. قد يكلف ذلك أرواحا. كما أن البلاغات الكاذبة جريمة يعاقب عليها القانون التونسي بالسجن وغرامات مالية.",
    "help.emergency.title": "أرقام الطوارئ في تونس",
    "help.emergency.police": "الشرطة: 197",
    "help.emergency.protection": "الحماية المدنية: 198",
    "help.emergency.samu": "SAMU: 190",
    "help.emergency.guard": "الحرس الوطني: 193",
    "notif.title": "الإشعارات",
    "notif.empty": "لا توجد إشعارات",
    "notif.help_on_the_way.title": "المساعدة في الطريق! 🚨",
    "notif.help_on_the_way.body": "تم تأكيد بلاغك. فريق الإنقاذ في طريقه إليك الآن.",
    "notif.case_resolved.title": "تم حل الحالة ✅",
    "notif.case_resolved.body": "تم تسجيل بلاغك كمحلول. نتمنى لك السلامة.",
    "notif.case_cancelled.title": "تم إلغاء البلاغ",
    "notif.case_cancelled.body": "تم إلغاء بلاغك من قبل المسؤولين."
  },
  fr: {
    "app.name": "ResQ Najda",
    "app.tagline": "L'aide à portée d'un bouton",
    "nav.sos": "Urgence",
    "nav.map": "Carte",
    "nav.feed": "Plaintes",
    "nav.profile": "Profil",
    "nav.admin": "Admin",
    "auth.welcome": "Bienvenue sur ResQ Najda",
    "auth.sub": "Connectez-vous pour appeler à l'aide",
    "auth.email": "E-mail",
    "auth.password": "Mot de passe",
    "auth.fullName": "Nom complet",
    "auth.signIn": "Se connecter",
    "auth.signUp": "Créer un compte",
    "auth.toSignUp": "Pas de compte ? Inscrivez-vous",
    "auth.toSignIn": "Déjà inscrit ? Se connecter",
    "auth.signOut": "Déconnexion",
    "auth.loading": "Chargement...",
    "sos.title": "Appuyez en cas d'urgence",
    "sos.subtitle": "Votre position sera envoyée automatiquement",
    "sos.button": "SOS",
    "sos.sending": "Envoi...",
    "sos.sent": "Alerte envoyée avec succès",
    "sos.error": "Impossible d'envoyer l'alerte",
    "sos.type.medical": "Médical",
    "sos.type.fire": "Incendie",
    "sos.type.police": "Police",
    "sos.type.accident": "Accident",
    "sos.type.other": "Autre",
    "sos.describe": "Décrire la situation (optionnel)",
    "sos.locating": "Localisation...",
    "sos.location.fail": "Localisation impossible",
    "map.title": "Alertes proches",
    "map.empty": "Aucune alerte pour le moment",
    "map.distance": "km",
    "feed.title": "Plaintes citoyennes",
    "feed.upload": "Publier",
    "feed.like": "J'aime",
    "feed.comment": "Commenter",
    "feed.donate": "Faire un don",
    "feed.empty": "Aucune vidéo. Soyez le premier à publier.",
    "upload.title": "Titre",
    "upload.description": "Description",
    "upload.video": "Choisir une vidéo",
    "upload.submit": "Publier",
    "upload.uploading": "Téléversement...",
    "comments.placeholder": "Écrire un commentaire...",
    "comments.send": "Envoyer",
    "donate.thanks": "Merci pour votre soutien ! (démo)",
    "severity.low": "Faible",
    "severity.medium": "Moyen",
    "severity.high": "Élevé",
    "severity.critical": "Critique",
    "common.cancel": "Annuler",
    "common.close": "Fermer",
    "lang.label": "Langue",
    "profile.medical": "Infos médicales",
    "profile.bloodType": "Groupe sanguin",
    "profile.allergies": "Allergies",
    "profile.medicalNotes": "Notes médicales",
    "profile.fullName": "Nom complet",
    "profile.phone": "Téléphone",
    "profile.contacts": "Contacts d'urgence",
    "profile.contact.name": "Nom",
    "profile.contact.phone": "Téléphone",
    "profile.contact.relation": "Relation",
    "profile.addContact": "Ajouter un contact",
    "profile.removeContact": "Retirer",
    "profile.save": "Enregistrer",
    "profile.saved": "Enregistré",
    "profile.saveError": "Échec de l'enregistrement",
    "profile.becomeAdmin": "Devenir admin (test)",
    "profile.adminGranted": "Vous êtes maintenant admin",
    "profile.adminTaken": "Un admin existe déjà",
    "admin.title": "Tableau de bord",
    "admin.stats.users": "Utilisateurs",
    "admin.stats.alerts": "Alertes",
    "admin.stats.pending": "En attente",
    "admin.stats.complaints": "Vidéos",
    "admin.stats.uploaders": "Contributeurs",
    "admin.stats.today": "Aujourd'hui",
    "admin.stats.week": "Cette semaine",
    "admin.alerts.title": "Alertes entrantes",
    "admin.alerts.empty": "Aucune alerte",
    "admin.markResolved": "Résolue",
    "admin.markDispatched": "Équipe envoyée",
    "admin.notAdmin": "Accès refusé",
    "status.pending": "En attente",
    "status.dispatched": "Envoyée",
    "status.resolved": "Résolue",
    "status.cancelled": "Annulée",
    "nav.help": "Aide",
    "map.details": "Détails de l'incident",
    "map.iCanHelp": "Je peux aider",
    "map.helpThanks": "Merci ! L'équipe sera informée que vous arrivez",
    "map.openInMaps": "Ouvrir dans Maps",
    "map.reported": "Signalé",
    "help.title": "Aide & informations",
    "help.manual": "Comment utiliser l'app",
    "help.manual.1": "Appuyez sur le grand bouton SOS en cas d'urgence pour envoyer votre position automatiquement.",
    "help.manual.2": "Consultez la carte pour voir les incidents proches et aidez si possible.",
    "help.manual.3": "Partagez vos alertes en vidéo dans la page Plaintes pour sensibiliser.",
    "help.manual.4": "Tenez votre profil médical à jour pour aider les secours.",
    "help.partners": "Nos partenaires",
    "help.partner.protection": "Protection Civile",
    "help.partner.police": "Police Nationale",
    "help.partner.guard": "Garde Nationale",
    "help.partner.samu": "SAMU - Urgence médicale",
    "help.partner.redcrescent": "Croissant-Rouge Tunisien",
    "help.dont": "À ne pas faire",
    "help.dont.1": "Ne pas envoyer de fausses alertes ou de blagues.",
    "help.dont.2": "Ne pas téléverser de contenus violents ou abusifs.",
    "help.dont.3": "Ne pas partager d'informations personnelles d'autrui sans leur accord.",
    "help.dont.4": "Ne pas utiliser l'application en dehors des vraies urgences.",
    "help.danger": "Pourquoi les fausses alertes sont dangereuses",
    "help.danger.body": "Une fausse alerte mobilise des secours qui auraient pu sauver une vraie victime. Cela peut coûter des vies. En Tunisie, les fausses alertes sont punies par la loi : amendes et peines de prison.",
    "help.emergency.title": "Numéros d'urgence en Tunisie",
    "help.emergency.police": "Police : 197",
    "help.emergency.protection": "Protection Civile : 198",
    "help.emergency.samu": "SAMU : 190",
    "help.emergency.guard": "Garde Nationale : 193",
    "notif.title": "Notifications",
    "notif.empty": "Aucune notification",
    "notif.help_on_the_way.title": "Les secours arrivent ! 🚨",
    "notif.help_on_the_way.body": "Votre alerte a été validée. Une équipe est en route vers vous.",
    "notif.case_resolved.title": "Cas résolu ✅",
    "notif.case_resolved.body": "Votre alerte a été marquée comme résolue. Prenez soin de vous.",
    "notif.case_cancelled.title": "Alerte annulée",
    "notif.case_cancelled.body": "Votre alerte a été annulée par l'administration."
  },
  en: {
    "app.name": "ResQ Najda",
    "app.tagline": "Help is one tap away",
    "nav.sos": "Emergency",
    "nav.map": "Map",
    "nav.feed": "Reports",
    "nav.profile": "Profile",
    "nav.admin": "Admin",
    "auth.welcome": "Welcome to ResQ Najda",
    "auth.sub": "Sign in to request help instantly",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.fullName": "Full name",
    "auth.signIn": "Sign in",
    "auth.signUp": "Sign up",
    "auth.toSignUp": "No account? Sign up",
    "auth.toSignIn": "Have an account? Sign in",
    "auth.signOut": "Sign out",
    "auth.loading": "Loading...",
    "sos.title": "Tap the button in case of emergency",
    "sos.subtitle": "Your location will be sent automatically",
    "sos.button": "SOS",
    "sos.sending": "Sending...",
    "sos.sent": "Alert sent successfully",
    "sos.error": "Could not send alert",
    "sos.type.medical": "Medical",
    "sos.type.fire": "Fire",
    "sos.type.police": "Police",
    "sos.type.accident": "Accident",
    "sos.type.other": "Other",
    "sos.describe": "Describe the situation (optional)",
    "sos.locating": "Locating...",
    "sos.location.fail": "Could not get location",
    "map.title": "Nearby alerts",
    "map.empty": "No alerts right now",
    "map.distance": "km",
    "feed.title": "Citizen reports",
    "feed.upload": "Upload",
    "feed.like": "Like",
    "feed.comment": "Comment",
    "feed.donate": "Donate",
    "feed.empty": "No videos yet. Be the first to share.",
    "upload.title": "Title",
    "upload.description": "Description",
    "upload.video": "Choose video",
    "upload.submit": "Publish",
    "upload.uploading": "Uploading...",
    "comments.placeholder": "Write a comment...",
    "comments.send": "Send",
    "donate.thanks": "Thanks for your support! (demo)",
    "severity.low": "Low",
    "severity.medium": "Medium",
    "severity.high": "High",
    "severity.critical": "Critical",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "lang.label": "Language",
    "profile.medical": "Medical info",
    "profile.bloodType": "Blood type",
    "profile.allergies": "Allergies",
    "profile.medicalNotes": "Medical notes",
    "profile.fullName": "Full name",
    "profile.phone": "Phone",
    "profile.contacts": "Emergency contacts",
    "profile.contact.name": "Name",
    "profile.contact.phone": "Phone",
    "profile.contact.relation": "Relation",
    "profile.addContact": "Add contact",
    "profile.removeContact": "Remove",
    "profile.save": "Save changes",
    "profile.saved": "Saved",
    "profile.saveError": "Could not save",
    "profile.becomeAdmin": "Become admin (test only)",
    "profile.adminGranted": "You are now an admin",
    "profile.adminTaken": "An admin already exists",
    "admin.title": "Admin dashboard",
    "admin.stats.users": "Users",
    "admin.stats.alerts": "Alerts",
    "admin.stats.pending": "Pending",
    "admin.stats.complaints": "Videos",
    "admin.stats.uploaders": "Uploaders",
    "admin.stats.today": "Today",
    "admin.stats.week": "This week",
    "admin.alerts.title": "Incoming SOS alerts",
    "admin.alerts.empty": "No alerts",
    "admin.markResolved": "Resolved",
    "admin.markDispatched": "Dispatched",
    "admin.notAdmin": "You don't have access to this page",
    "status.pending": "Pending",
    "status.dispatched": "Dispatched",
    "status.resolved": "Resolved",
    "status.cancelled": "Cancelled",
    "nav.help": "Help",
    "map.details": "Incident details",
    "map.iCanHelp": "I can help",
    "map.helpThanks": "Thank you! The team will know you're on your way",
    "map.openInMaps": "Open in Maps",
    "map.reported": "Reported",
    "help.title": "Help & info",
    "help.manual": "How to use the app",
    "help.manual.1": "Press the big SOS button in emergencies to send your location automatically.",
    "help.manual.2": "Browse the map to see nearby incidents and help if you can.",
    "help.manual.3": "Share your reports as videos on the Reports page to raise awareness.",
    "help.manual.4": "Keep your medical profile up to date to help first responders.",
    "help.partners": "Our partners",
    "help.partner.protection": "Civil Protection",
    "help.partner.police": "National Police",
    "help.partner.guard": "National Guard",
    "help.partner.samu": "SAMU - Medical Emergency",
    "help.partner.redcrescent": "Tunisian Red Crescent",
    "help.dont": "What you should NOT do",
    "help.dont.1": "Don't send fake or prank alerts.",
    "help.dont.2": "Don't upload violent or abusive videos.",
    "help.dont.3": "Don't share other people's personal info without consent.",
    "help.dont.4": "Don't use the app for non-emergency purposes.",
    "help.danger": "Why fake alerts are dangerous",
    "help.danger.body": "A fake alert wastes emergency resources and delays help to people who really need it. It can cost lives. In Tunisia, false alerts are a crime punishable by fines and prison time.",
    "help.emergency.title": "Tunisia emergency numbers",
    "help.emergency.police": "Police: 197",
    "help.emergency.protection": "Civil Protection: 198",
    "help.emergency.samu": "SAMU: 190",
    "help.emergency.guard": "National Guard: 193",
    "notif.title": "Notifications",
    "notif.empty": "No notifications yet",
    "notif.help_on_the_way.title": "Help is on the way! 🚨",
    "notif.help_on_the_way.body": "Your alert was validated. A rescue team is heading to you now.",
    "notif.case_resolved.title": "Case resolved ✅",
    "notif.case_resolved.body": "Your alert has been marked as resolved. Stay safe.",
    "notif.case_cancelled.title": "Alert cancelled",
    "notif.case_cancelled.body": "Your alert was cancelled by the admin team."
  }
};
const I18nContext = createContext(void 0);
function I18nProvider({ children }) {
  const [lang, setLangState] = useState("ar");
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("resq.lang");
    if (saved && ["ar", "fr", "en"].includes(saved)) setLangState(saved);
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);
  const setLang = (l) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("resq.lang", l);
  };
  const t = (key) => TRANSLATIONS[lang][key] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";
  return /* @__PURE__ */ jsx(I18nContext.Provider, { value: { lang, setLang, t, dir }, children });
}
function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
function createSupabaseClient() {
  const SUPABASE_URL = "https://agprtcaydffepxwlxhli.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncHJ0Y2F5ZGZmZXB4d2x4aGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyODI3ODEsImV4cCI6MjA5Mjg1ODc4MX0.q5575sIh5KnzMyvPXYDr2tgUKYIjmVfMdhCdwdbTrnw";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, session, loading, signOut }, children });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-BHLsaSNJ.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground", children: "Go home" }) })
  ] }) });
}
const Route$6 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1a1f3a" },
      { title: "ResQ Najda — نجدتك على بُعد ضغطة زر" },
      { name: "description", content: "ResQ Najda: emergency SOS, live incident map, and citizen video reports for Tunisia." },
      { property: "og:title", content: "ResQ Najda" },
      { property: "og:description", content: "Emergency response platform — SOS, live map, citizen reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "ar", dir: "rtl", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsx(I18nProvider, { children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-center", richColors: true })
  ] }) });
}
const $$splitComponentImporter$5 = () => import("./profile-D5LVKx5l.js");
const Route$5 = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "ResQ Najda — Profile"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./map-Bkv4jppb.js");
const Route$4 = createFileRoute("/map")({
  head: () => ({
    meta: [{
      title: "ResQ Najda — Nearby alerts"
    }, {
      name: "description",
      content: "Live map of incidents near you, sorted by distance."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./help-CoG_v1t4.js");
const Route$3 = createFileRoute("/help")({
  head: () => ({
    meta: [{
      title: "ResQ Najda — Help & info"
    }, {
      name: "description",
      content: "How to use ResQ Najda, our partners, rules, and emergency numbers."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./feed-pocp21IW.js");
const Route$2 = createFileRoute("/feed")({
  head: () => ({
    meta: [{
      title: "ResQ Najda — Citizen reports"
    }, {
      name: "description",
      content: "Scroll through citizen complaint videos. Like, comment, and donate."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-BWQoj_Cc.js");
const Route$1 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "ResQ Najda — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-CXsbPf2R.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "ResQ Najda — SOS"
    }, {
      name: "description",
      content: "Tap the SOS button to send your location and call for help."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ProfileRoute = Route$5.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$6
});
const MapRoute = Route$4.update({
  id: "/map",
  path: "/map",
  getParentRoute: () => Route$6
});
const HelpRoute = Route$3.update({
  id: "/help",
  path: "/help",
  getParentRoute: () => Route$6
});
const FeedRoute = Route$2.update({
  id: "/feed",
  path: "/feed",
  getParentRoute: () => Route$6
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$6
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  FeedRoute,
  HelpRoute,
  MapRoute,
  ProfileRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  useI18n as a,
  router as r,
  supabase as s,
  useAuth as u
};
