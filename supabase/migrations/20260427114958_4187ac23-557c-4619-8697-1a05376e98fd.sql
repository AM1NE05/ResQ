-- Fix search_path on functions
ALTER FUNCTION public.set_updated_at() SET search_path = public;
ALTER FUNCTION public.bump_complaint_likes() SET search_path = public;
ALTER FUNCTION public.bump_complaint_comments() SET search_path = public;

-- Lock down SECURITY DEFINER functions to authenticated users only
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Replace public-read policy on complaint videos with a tighter SELECT
DROP POLICY IF EXISTS "complaint_videos_public_read" ON storage.objects;
CREATE POLICY "complaint_videos_read_authenticated" ON storage.objects FOR SELECT
  TO authenticated USING (bucket_id = 'complaint-videos');
-- Anonymous users can still fetch individual files via the public URL since the bucket is public,
-- but they cannot list the bucket contents.
