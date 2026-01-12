-- Update signup handler to grant admin role for admin@refurrm.app
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.email
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE
      WHEN lower(NEW.email) = 'admin@refurrm.app' THEN 'admin'::app_role
      ELSE 'notary'::app_role
    END
  );

  RETURN NEW;
END;
$$;

-- Backfill role for existing admin user if present
WITH admin_user AS (
  SELECT id
  FROM auth.users
  WHERE lower(email) = 'admin@refurrm.app'
  LIMIT 1
),
deleted AS (
  DELETE FROM public.user_roles
  WHERE user_id IN (SELECT id FROM admin_user)
)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM admin_user;
