
-- Helper to bootstrap the first admin: any authenticated user can claim admin
-- ONLY if no admin exists yet. After that, only admins can grant the role.
CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_exists boolean;
  uid uuid;
BEGIN
  uid := auth.uid();
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO admin_exists;
  IF admin_exists THEN
    RETURN false;
  END IF;

  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
  ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;

-- Admin-readable view of basic user info via profiles already exists.
-- Add helper to count distinct uploaders for stats.
CREATE OR REPLACE FUNCTION public.admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT jsonb_build_object(
    'total_users', (SELECT count(*) FROM public.profiles),
    'total_alerts', (SELECT count(*) FROM public.alerts),
    'pending_alerts', (SELECT count(*) FROM public.alerts WHERE status = 'pending'),
    'total_complaints', (SELECT count(*) FROM public.complaints),
    'total_uploaders', (SELECT count(DISTINCT user_id) FROM public.complaints),
    'alerts_today', (SELECT count(*) FROM public.alerts WHERE created_at >= now() - interval '24 hours'),
    'alerts_week', (SELECT count(*) FROM public.alerts WHERE created_at >= now() - interval '7 days')
  ) INTO result;

  RETURN result;
END;
$$;
