-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.alert_type AS ENUM ('medical', 'fire', 'police', 'accident', 'other');
CREATE TYPE public.alert_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.alert_status AS ENUM ('pending', 'dispatched', 'resolved', 'cancelled');

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  blood_type TEXT,
  allergies TEXT,
  medical_notes TEXT,
  emergency_contacts JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check role (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- ============ ALERTS ============
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type alert_type NOT NULL DEFAULT 'other',
  severity alert_severity NOT NULL DEFAULT 'high',
  status alert_status NOT NULL DEFAULT 'pending',
  description TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE INDEX alerts_created_at_idx ON public.alerts (created_at DESC);
CREATE INDEX alerts_status_idx ON public.alerts (status);

-- ============ COMPLAINTS (videos) ============
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  location_label TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  donations_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
CREATE INDEX complaints_created_at_idx ON public.complaints (created_at DESC);

-- ============ COMPLAINT LIKES ============
CREATE TABLE public.complaint_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES public.complaints(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (complaint_id, user_id)
);
ALTER TABLE public.complaint_likes ENABLE ROW LEVEL SECURITY;

-- ============ COMPLAINT COMMENTS ============
CREATE TABLE public.complaint_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID NOT NULL REFERENCES public.complaints(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.complaint_comments ENABLE ROW LEVEL SECURITY;
CREATE INDEX complaint_comments_complaint_idx ON public.complaint_comments (complaint_id, created_at DESC);

-- ============ TRIGGERS ============
-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER alerts_set_updated_at BEFORE UPDATE ON public.alerts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile + default role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Counter triggers for complaints
CREATE OR REPLACE FUNCTION public.bump_complaint_likes()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.complaints SET likes_count = likes_count + 1 WHERE id = NEW.complaint_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.complaints SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.complaint_id;
  END IF;
  RETURN NULL;
END;
$$;
CREATE TRIGGER complaint_likes_count
AFTER INSERT OR DELETE ON public.complaint_likes
FOR EACH ROW EXECUTE FUNCTION public.bump_complaint_likes();

CREATE OR REPLACE FUNCTION public.bump_complaint_comments()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.complaints SET comments_count = comments_count + 1 WHERE id = NEW.complaint_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.complaints SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.complaint_id;
  END IF;
  RETURN NULL;
END;
$$;
CREATE TRIGGER complaint_comments_count
AFTER INSERT OR DELETE ON public.complaint_comments
FOR EACH ROW EXECUTE FUNCTION public.bump_complaint_comments();

-- ============ RLS POLICIES ============
-- profiles
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- user_roles (read own + admins read all; only admins manage)
CREATE POLICY "user_roles_select_own_or_admin" ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "user_roles_admin_manage" ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- alerts
CREATE POLICY "alerts_select_authenticated" ON public.alerts FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "alerts_insert_own" ON public.alerts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "alerts_update_own_or_admin" ON public.alerts FOR UPDATE
  TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "alerts_delete_own_or_admin" ON public.alerts FOR DELETE
  TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- complaints
CREATE POLICY "complaints_select_all" ON public.complaints FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "complaints_insert_own" ON public.complaints FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "complaints_update_own" ON public.complaints FOR UPDATE
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "complaints_delete_own_or_admin" ON public.complaints FOR DELETE
  TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- likes
CREATE POLICY "complaint_likes_select_all" ON public.complaint_likes FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "complaint_likes_insert_own" ON public.complaint_likes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "complaint_likes_delete_own" ON public.complaint_likes FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- comments
CREATE POLICY "complaint_comments_select_all" ON public.complaint_comments FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "complaint_comments_insert_own" ON public.complaint_comments FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "complaint_comments_delete_own" ON public.complaint_comments FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ============ STORAGE BUCKET ============
INSERT INTO storage.buckets (id, name, public)
VALUES ('complaint-videos', 'complaint-videos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "complaint_videos_public_read" ON storage.objects FOR SELECT
  USING (bucket_id = 'complaint-videos');
CREATE POLICY "complaint_videos_authenticated_upload" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'complaint-videos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "complaint_videos_owner_delete" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'complaint-videos' AND auth.uid()::text = (storage.foldername(name))[1]);
