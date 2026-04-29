import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Plus, Heart, MessageCircle, HandCoins, X, Send } from "lucide-react";
import { A as AppShell } from "./AppShell-BtAnQFby.js";
import { a as useI18n, u as useAuth, s as supabase } from "./router-CARJVMO8.js";
import "@radix-ui/react-dropdown-menu";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-router";
import "zod";
import "@supabase/supabase-js";
function FeedPage() {
  const {
    t
  } = useI18n();
  const {
    user
  } = useAuth();
  const [items, setItems] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [openComments, setOpenComments] = useState(null);
  const [likedIds, setLikedIds] = useState(/* @__PURE__ */ new Set());
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
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-extrabold", children: t("feed.title") }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowUpload(true), className: "btn-emergency inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " ",
        t("feed.upload")
      ] })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsx("p", { className: "rounded-2xl bg-card p-8 text-center text-sm text-muted-foreground", children: t("feed.empty") }) : /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: items.map((c) => /* @__PURE__ */ jsxs("li", { className: "overflow-hidden rounded-3xl bg-navy text-navy-foreground shadow-[var(--shadow-elevated)]", children: [
      /* @__PURE__ */ jsx("div", { className: "relative aspect-[9/14] bg-black", children: /* @__PURE__ */ jsx("video", { src: c.video_url, controls: true, playsInline: true, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: c.title }),
        c.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: c.description }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-around pt-2", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => toggleLike(c), className: "flex flex-col items-center gap-0.5", children: [
            /* @__PURE__ */ jsx(Heart, { className: `h-6 w-6 ${likedIds.has(c.id) ? "fill-emergency text-emergency" : ""}` }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: c.likes_count })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setOpenComments(c), className: "flex flex-col items-center gap-0.5", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: c.comments_count })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => donate(c), className: "flex flex-col items-center gap-0.5 text-emergency-glow", children: [
            /* @__PURE__ */ jsx(HandCoins, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", children: c.donations_count })
          ] })
        ] })
      ] })
    ] }, c.id)) }),
    showUpload && /* @__PURE__ */ jsx(UploadDialog, { onClose: () => setShowUpload(false), onUploaded: load }),
    openComments && /* @__PURE__ */ jsx(CommentsDialog, { complaint: openComments, onClose: () => setOpenComments(null), onChange: load })
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
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
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "w-full max-w-md rounded-t-3xl bg-card p-6 sm:rounded-3xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: t("feed.upload") }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "rounded-full p-1 hover:bg-muted", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("input", { placeholder: t("upload.title"), value: title, onChange: (e) => setTitle(e.target.value), maxLength: 120, required: true, className: "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-emergency" }),
      /* @__PURE__ */ jsx("textarea", { placeholder: t("upload.description"), value: description, onChange: (e) => setDescription(e.target.value), maxLength: 1e3, rows: 3, className: "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-emergency" }),
      /* @__PURE__ */ jsx("input", { type: "file", accept: "video/*", onChange: (e) => setFile(e.target.files?.[0] ?? null), required: true, className: "block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emergency file:px-4 file:py-2 file:text-emergency-foreground" }),
      /* @__PURE__ */ jsx("button", { disabled: busy, className: "btn-emergency w-full rounded-xl py-3 font-semibold disabled:opacity-60", children: busy ? t("upload.uploading") : t("upload.submit") })
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
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const load = async () => {
    const {
      data
    } = await supabase.from("complaint_comments").select("id,user_id,content,created_at").eq("complaint_id", complaint.id).order("created_at", {
      ascending: false
    });
    if (data) setComments(data);
  };
  useEffect(() => {
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
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "flex h-[75vh] w-full max-w-md flex-col rounded-t-3xl bg-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxs("h3", { className: "font-semibold", children: [
        t("feed.comment"),
        " (",
        comments.length,
        ")"
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "rounded-full p-1 hover:bg-muted", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "flex-1 space-y-3 overflow-y-auto p-4", children: [
      comments.map((c) => /* @__PURE__ */ jsxs("li", { className: "rounded-2xl bg-muted px-4 py-2 text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: new Date(c.created_at).toLocaleString() }),
        /* @__PURE__ */ jsx("div", { children: c.content })
      ] }, c.id)),
      comments.length === 0 && /* @__PURE__ */ jsx("li", { className: "pt-8 text-center text-sm text-muted-foreground", children: "—" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: send, className: "flex items-center gap-2 border-t border-border p-3", children: [
      /* @__PURE__ */ jsx("input", { ref: inputRef, value: text, onChange: (e) => setText(e.target.value), placeholder: t("comments.placeholder"), maxLength: 500, className: "flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-emergency" }),
      /* @__PURE__ */ jsx("button", { className: "btn-emergency rounded-full p-2", children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(FeedPage, {}) });
export {
  SplitComponent as component
};
