
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  alert_id UUID REFERENCES public.alerts(id) ON DELETE CASCADE,
  kind TEXT NOT NULL DEFAULT 'alert_status',
  title TEXT NOT NULL,
  body TEXT,
  status TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX notifications_user_idx ON public.notifications(user_id, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users update own notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins insert notifications"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR auth.uid() = user_id);

-- Trigger: when alert status changes, notify the alert owner
CREATE OR REPLACE FUNCTION public.notify_alert_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_title TEXT;
  v_body TEXT;
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status AND NEW.user_id IS NOT NULL THEN
    IF NEW.status = 'dispatched' THEN
      v_title := 'help_on_the_way';
      v_body := 'Your emergency request has been validated. Help is on the way.';
    ELSIF NEW.status = 'resolved' THEN
      v_title := 'case_resolved';
      v_body := 'Your emergency case has been marked as resolved.';
    ELSIF NEW.status = 'cancelled' THEN
      v_title := 'case_cancelled';
      v_body := 'Your emergency case has been cancelled.';
    ELSE
      RETURN NEW;
    END IF;

    INSERT INTO public.notifications (user_id, alert_id, kind, title, body, status)
    VALUES (NEW.user_id, NEW.id, 'alert_status', v_title, v_body, NEW.status);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER alerts_notify_status_change
AFTER UPDATE ON public.alerts
FOR EACH ROW
EXECUTE FUNCTION public.notify_alert_status_change();

ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
