-- Add mobile_number column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS mobile_number TEXT;

-- Update the handle_new_user function to include mobile number
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, mobile_number)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'mobile_number', '')
  )
  ON CONFLICT (user_id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    mobile_number = EXCLUDED.mobile_number,
    updated_at = now();
  RETURN NEW;
END;
$$;