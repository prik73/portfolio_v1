-- 1. Create the table for tracking visits
create table website_visits (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  visitor_id uuid not null,   -- We generate this in the frontend and store in localStorage
  city text,
  country text,
  device_type text,           -- 'mobile', 'desktop', etc.
  os text,                    -- 'Windows', 'iOS', etc.
  browser text
);

-- 2. Turn on Row Level Security (RLS)
alter table website_visits enable row level security;

-- 3. Allow anyone (anon users) to INSERT a new visit
create policy "Enable insert for anon" 
on website_visits 
for insert 
with check (true);

-- 4. Allow anyone to SELECT (count) the visits
create policy "Enable select for anon" 
on website_visits 
for select 
using (true);

-- Done! Run this in the Supabase SQL Editor.
