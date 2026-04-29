import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-BCiOq1yH.js";
import { a as useI18n, u as useAuth, s as supabase, t as toast } from "./router-Bo5vnDPi.js";
import { c as createLucideIcon, A as AppShell } from "./AppShell-CWx62ij6.js";
import { P as Plus } from "./plus-FTuU3mPK.js";
import { X } from "./x-BIzhL7yi.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["path", { d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17", key: "geh8rc" }],
  [
    "path",
    {
      d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "1fto5m"
    }
  ],
  ["path", { d: "m2 16 6 6", key: "1pfhp9" }],
  ["circle", { cx: "16", cy: "9", r: "2.9", key: "1n0dlu" }],
  ["circle", { cx: "6", cy: "5", r: "3", key: "151irh" }]
];
const HandCoins = createLucideIcon("hand-coins", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function FeedPage() {
  const {
    t
  } = useI18n();
  const {
    user
  } = useAuth();
  const [items, setItems] = reactExports.useState([]);
  const [showUpload, setShowUpload] = reactExports.useState(false);
  const [openComments, setOpenComments] = reactExports.useState(null);
  const [likedIds, setLikedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const load = async () => {
    const {
      data
    } = await supabase.from("complaints").select("*").order("created_at", {
      ascending: false
    }).limit(50);
    if (data) setItems(data);
    if (user) {
      const {
        data: likes
      } = await supabase.from("complaint_likes").select("complaint_id").eq("user_id", user.id);
      if (likes) setLikedIds(new Set(likes.map((l) => l.complaint_id)));
    }
  };
  reactExports.useEffect(() => {
    load();
  }, [user?.id]);
  const toggleLike = async (c) => {
    if (!user) return;
    const liked = likedIds.has(c.id);
    if (liked) {
      await supabase.from("complaint_likes").delete().eq("complaint_id", c.id).eq("user_id", user.id);
      setLikedIds((s) => {
        const n = new Set(s);
        n.delete(c.id);
        return n;
      });
      setItems((arr) => arr.map((x) => x.id === c.id ? {
        ...x,
        likes_count: Math.max(0, x.likes_count - 1)
      } : x));
    } else {
      await supabase.from("complaint_likes").insert({
        complaint_id: c.id,
        user_id: user.id
      });
      setLikedIds((s) => new Set(s).add(c.id));
      setItems((arr) => arr.map((x) => x.id === c.id ? {
        ...x,
        likes_count: x.likes_count + 1
      } : x));
    }
  };
  const donate = (c) => {
    toast.success(t("donate.thanks"));
    setItems((arr) => arr.map((x) => x.id === c.id ? {
      ...x,
      donations_count: x.donations_count + 1
    } : x));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold", children: t("feed.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowUpload(true), className: "btn-emergency inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " ",
        t("feed.upload")
      ] })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl bg-card p-8 text-center text-sm text-muted-foreground", children: t("feed.empty") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "overflow-hidden rounded-3xl bg-navy text-navy-foreground shadow-[var(--shadow-elevated)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[9/14] bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: c.video_url, controls: true, playsInline: true, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: c.title }),
        c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70", children: c.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-around pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleLike(c), className: "flex flex-col items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-6 w-6 ${likedIds.has(c.id) ? "fill-emergency text-emergency" : ""}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: c.likes_count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpenComments(c), className: "flex flex-col items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: c.comments_count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => donate(c), className: "flex flex-col items-center gap-0.5 text-emergency-glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HandCoins, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: c.donations_count })
          ] })
        ] })
      ] })
    ] }, c.id)) }),
    showUpload && /* @__PURE__ */ jsxRuntimeExports.jsx(UploadDialog, { onClose: () => setShowUpload(false), onUploaded: load }),
    openComments && /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsDialog, { complaint: openComments, onClose: () => setOpenComments(null), onChange: load })
  ] });
}
function UploadDialog({
  onClose,
  onUploaded
}) {
  const {
    t
  } = useI18n();
  const {
    user
  } = useAuth();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [file, setFile] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!user || !file) return;
    if (file.size > 80 * 1024 * 1024) {
      toast.error("Max 80MB");
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "mp4";
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const {
        error: upErr
      } = await supabase.storage.from("complaint-videos").upload(path, file, {
        contentType: file.type || "video/mp4"
      });
      if (upErr) throw upErr;
      const {
        data: pub
      } = supabase.storage.from("complaint-videos").getPublicUrl(path);
      const {
        error
      } = await supabase.from("complaints").insert({
        user_id: user.id,
        title: title.trim().slice(0, 120) || "Untitled",
        description: description.trim().slice(0, 1e3) || null,
        video_url: pub.publicUrl
      });
      if (error) throw error;
      toast.success("✓");
      onUploaded();
      onClose();
    } catch (err) {
      toast.error(err?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "w-full max-w-md rounded-t-3xl bg-card p-6 sm:rounded-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: t("feed.upload") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "rounded-full p-1 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: t("upload.title"), value: title, onChange: (e) => setTitle(e.target.value), maxLength: 120, required: true, className: "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-emergency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: t("upload.description"), value: description, onChange: (e) => setDescription(e.target.value), maxLength: 1e3, rows: 3, className: "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-emergency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "video/*", onChange: (e) => setFile(e.target.files?.[0] ?? null), required: true, className: "block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emergency file:px-4 file:py-2 file:text-emergency-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy, className: "btn-emergency w-full rounded-xl py-3 font-semibold disabled:opacity-60", children: busy ? t("upload.uploading") : t("upload.submit") })
    ] })
  ] }) });
}
function CommentsDialog({
  complaint,
  onClose,
  onChange
}) {
  const {
    t
  } = useI18n();
  const {
    user
  } = useAuth();
  const [comments, setComments] = reactExports.useState([]);
  const [text, setText] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const load = async () => {
    const {
      data
    } = await supabase.from("complaint_comments").select("id,user_id,content,created_at").eq("complaint_id", complaint.id).order("created_at", {
      ascending: false
    });
    if (data) setComments(data);
  };
  reactExports.useEffect(() => {
    load();
  }, [complaint.id]);
  const send = async (e) => {
    e.preventDefault();
    if (!user || !text.trim()) return;
    const content = text.trim().slice(0, 500);
    setText("");
    const {
      error
    } = await supabase.from("complaint_comments").insert({
      complaint_id: complaint.id,
      user_id: user.id,
      content
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    load();
    onChange();
    inputRef.current?.focus();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[75vh] w-full max-w-md flex-col rounded-t-3xl bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold", children: [
        t("feed.comment"),
        " (",
        comments.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "rounded-full p-1 hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex-1 space-y-3 overflow-y-auto p-4", children: [
      comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-2xl bg-muted px-4 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(c.created_at).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: c.content })
      ] }, c.id)),
      comments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "pt-8 text-center text-sm text-muted-foreground", children: "—" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: send, className: "flex items-center gap-2 border-t border-border p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, value: text, onChange: (e) => setText(e.target.value), placeholder: t("comments.placeholder"), maxLength: 500, className: "flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-emergency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-emergency rounded-full p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedPage, {}) });
export {
  SplitComponent as component
};
