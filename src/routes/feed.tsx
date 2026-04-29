import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Heart, MessageCircle, HandCoins, Plus, X, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/client";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "ResQ Najda — Citizen reports" },
      {
        name: "description",
        content:
          "Scroll through citizen complaint videos. Like, comment, and donate.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <FeedPage />
    </AppShell>
  ),
});

interface Complaint {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  video_url: string;
  likes_count: number;
  comments_count: number;
  donations_count: number;
  created_at: string;
}

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

function FeedPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [items, setItems] = useState<Complaint[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [openComments, setOpenComments] = useState<Complaint | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const load = async () => {
    const { data } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setItems(data as Complaint[]);

    if (user) {
      const { data: likes } = await supabase
        .from("complaint_likes")
        .select("complaint_id")
        .eq("user_id", user.id);
      if (likes) setLikedIds(new Set(likes.map((l) => l.complaint_id)));
    }
  };

  useEffect(() => {
    load();
  }, [user?.id]);

  const toggleLike = async (c: Complaint) => {
    if (!user) return;
    const liked = likedIds.has(c.id);
    if (liked) {
      await supabase
        .from("complaint_likes")
        .delete()
        .eq("complaint_id", c.id)
        .eq("user_id", user.id);
      setLikedIds((s) => {
        const n = new Set(s);
        n.delete(c.id);
        return n;
      });
      setItems((arr) =>
        arr.map((x) =>
          x.id === c.id
            ? { ...x, likes_count: Math.max(0, x.likes_count - 1) }
            : x,
        ),
      );
    } else {
      await supabase
        .from("complaint_likes")
        .insert({ complaint_id: c.id, user_id: user.id });
      setLikedIds((s) => new Set(s).add(c.id));
      setItems((arr) =>
        arr.map((x) =>
          x.id === c.id ? { ...x, likes_count: x.likes_count + 1 } : x,
        ),
      );
    }
  };

  const donate = (c: Complaint) => {
    toast.success(t("donate.thanks"));
    setItems((arr) =>
      arr.map((x) =>
        x.id === c.id ? { ...x, donations_count: x.donations_count + 1 } : x,
      ),
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">{t("feed.title")}</h1>
        <button
          onClick={() => setShowUpload(true)}
          className="btn-emergency inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold"
        >
          <Plus className="h-4 w-4" /> {t("feed.upload")}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl bg-card p-8 text-center text-sm text-muted-foreground">
          {t("feed.empty")}
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((c) => (
            <li
              key={c.id}
              className="overflow-hidden rounded-3xl bg-navy text-navy-foreground shadow-[var(--shadow-elevated)]"
            >
              <div className="relative aspect-[9/14] bg-black">
                <video
                  src={c.video_url}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-lg font-bold">{c.title}</h3>
                {c.description && (
                  <p className="text-sm text-white/70">{c.description}</p>
                )}
                <div className="flex items-center justify-around pt-2">
                  <button
                    onClick={() => toggleLike(c)}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <Heart
                      className={`h-6 w-6 ${likedIds.has(c.id) ? "fill-emergency text-emergency" : ""}`}
                    />
                    <span className="text-xs">{c.likes_count}</span>
                  </button>
                  <button
                    onClick={() => setOpenComments(c)}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-xs">{c.comments_count}</span>
                  </button>
                  <button
                    onClick={() => donate(c)}
                    className="flex flex-col items-center gap-0.5 text-emergency-glow"
                  >
                    <HandCoins className="h-6 w-6" />
                    <span className="text-xs">{c.donations_count}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showUpload && (
        <UploadDialog onClose={() => setShowUpload(false)} onUploaded={load} />
      )}
      {openComments && (
        <CommentsDialog
          complaint={openComments}
          onClose={() => setOpenComments(null)}
          onChange={load}
        />
      )}
    </div>
  );
}

function UploadDialog({
  onClose,
  onUploaded,
}: {
  onClose: () => void;
  onUploaded: () => void;
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
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
      const { error: upErr } = await supabase.storage
        .from("complaint-videos")
        .upload(path, file, {
          contentType: file.type || "video/mp4",
        });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage
        .from("complaint-videos")
        .getPublicUrl(path);
      const { error } = await supabase.from("complaints").insert({
        user_id: user.id,
        title: title.trim().slice(0, 120) || "Untitled",
        description: description.trim().slice(0, 1000) || null,
        video_url: pub.publicUrl,
      });
      if (error) throw error;
      toast.success("✓");
      onUploaded();
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-t-3xl bg-card p-6 sm:rounded-3xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t("feed.upload")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          <input
            placeholder={t("upload.title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-emergency"
          />
          <textarea
            placeholder={t("upload.description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            rows={3}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-emergency"
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emergency file:px-4 file:py-2 file:text-emergency-foreground"
          />
          <button
            disabled={busy}
            className="btn-emergency w-full rounded-xl py-3 font-semibold disabled:opacity-60"
          >
            {busy ? t("upload.uploading") : t("upload.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}

function CommentsDialog({
  complaint,
  onClose,
  onChange,
}: {
  complaint: Complaint;
  onClose: () => void;
  onChange: () => void;
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase
      .from("complaint_comments")
      .select("id,user_id,content,created_at")
      .eq("complaint_id", complaint.id)
      .order("created_at", { ascending: false });
    if (data) setComments(data as Comment[]);
  };
  useEffect(() => {
    load();
  }, [complaint.id]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim()) return;
    const content = text.trim().slice(0, 500);
    setText("");
    const { error } = await supabase.from("complaint_comments").insert({
      complaint_id: complaint.id,
      user_id: user.id,
      content,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    load();
    onChange();
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="flex h-[75vh] w-full max-w-md flex-col rounded-t-3xl bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="font-semibold">
            {t("feed.comment")} ({comments.length})
          </h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="flex-1 space-y-3 overflow-y-auto p-4">
          {comments.map((c) => (
            <li key={c.id} className="rounded-2xl bg-muted px-4 py-2 text-sm">
              <div className="text-xs text-muted-foreground">
                {new Date(c.created_at).toLocaleString()}
              </div>
              <div>{c.content}</div>
            </li>
          ))}
          {comments.length === 0 && (
            <li className="pt-8 text-center text-sm text-muted-foreground">
              —
            </li>
          )}
        </ul>
        <form
          onSubmit={send}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("comments.placeholder")}
            maxLength={500}
            className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-emergency"
          />
          <button className="btn-emergency rounded-full p-2">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
