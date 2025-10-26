-- Create user type enum
CREATE TYPE public.user_type AS ENUM ('worker', 'employer');

-- Create app role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  user_type public.user_type NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Create worker_profiles table for worker-specific data
CREATE TABLE public.worker_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  skills TEXT[] DEFAULT '{}',
  experience_level TEXT,
  hourly_rate DECIMAL,
  availability TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  rating DECIMAL DEFAULT 0,
  total_jobs INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employer_profiles table for employer-specific data
CREATE TABLE public.employer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name TEXT,
  company_description TEXT,
  business_type TEXT,
  verification_status TEXT DEFAULT 'pending',
  rating DECIMAL DEFAULT 0,
  total_hires INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles table
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles table
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for worker_profiles
CREATE POLICY "Anyone can view worker profiles"
  ON public.worker_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Workers can update own profile"
  ON public.worker_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Workers can insert own profile"
  ON public.worker_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for employer_profiles
CREATE POLICY "Anyone can view employer profiles"
  ON public.employer_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employers can update own profile"
  ON public.employer_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Employers can insert own profile"
  ON public.employer_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    CAST(COALESCE(NEW.raw_user_meta_data->>'user_type', 'worker') AS public.user_type)
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  -- Create type-specific profile
  IF (NEW.raw_user_meta_data->>'user_type' = 'worker') THEN
    INSERT INTO public.worker_profiles (user_id)
    VALUES (NEW.id);
  ELSIF (NEW.raw_user_meta_data->>'user_type' = 'employer') THEN
    INSERT INTO public.employer_profiles (user_id)
    VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_worker_profiles_updated_at
  BEFORE UPDATE ON public.worker_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employer_profiles_updated_at
  BEFORE UPDATE ON public.employer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();