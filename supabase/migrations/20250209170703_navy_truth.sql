/*
  # User Profiles and Recipes Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `is_donor` (boolean)
      - `subscription_type` (text)
      - `subscription_end_date` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `saved_recipes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `recipe_id` (uuid, references recipes)
      - `created_at` (timestamptz)
      
    - `recipes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `ingredients` (jsonb)
      - `instructions` (text[])
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  is_donor boolean DEFAULT false,
  subscription_type text,
  subscription_end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create recipes table
CREATE TABLE recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  ingredients jsonb NOT NULL,
  instructions text[] NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create saved_recipes table
CREATE TABLE saved_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  recipe_id uuid REFERENCES recipes(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Recipes policies
CREATE POLICY "Anyone can read recipes"
  ON recipes FOR SELECT
  TO authenticated
  USING (true);

-- Saved recipes policies
CREATE POLICY "Users can read own saved recipes"
  ON saved_recipes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save recipes"
  ON saved_recipes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave recipes"
  ON saved_recipes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);