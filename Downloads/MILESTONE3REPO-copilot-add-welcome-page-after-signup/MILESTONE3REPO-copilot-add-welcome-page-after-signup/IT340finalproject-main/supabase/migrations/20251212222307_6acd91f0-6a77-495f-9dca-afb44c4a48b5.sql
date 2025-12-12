-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Users can view own codes" ON public.twofa_codes;

-- Allow authenticated users to insert their own codes (for signup flow)
CREATE POLICY "Users can insert own codes"
ON public.twofa_codes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to view their own codes
CREATE POLICY "Users can view own codes"
ON public.twofa_codes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow authenticated users to update their own codes (mark as used)
CREATE POLICY "Users can update own codes"
ON public.twofa_codes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Allow anon users to insert codes (needed for signup before full auth)
CREATE POLICY "Service can insert codes"
ON public.twofa_codes
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anon to verify codes during signup
CREATE POLICY "Service can read codes for verification"
ON public.twofa_codes
FOR SELECT
TO anon
USING (true);

-- Allow updating codes to mark as used
CREATE POLICY "Service can update codes"
ON public.twofa_codes
FOR UPDATE
TO anon
USING (true);

-- Add email_verified column to profiles if not exists
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;