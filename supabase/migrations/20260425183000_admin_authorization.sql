begin;

-- Create admin_users table if it doesn't exist
create table if not exists public.admin_users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.admin_users enable row level security;

-- Drop policy if it exists and recreate
drop policy if exists "Allow admins to read admin_users" on public.admin_users;
create policy "Allow admins to read admin_users"
    on public.admin_users
    for select
    to authenticated
    using (true);

-- Create the helper function to check if the current user is an admin
create or replace function public.is_admin_user()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
    return exists (
        select 1 
        from public.admin_users 
        where email = auth.jwt() ->> 'email'
    );
end;
$$;

-- Insert the user's email into the admin_users table
insert into public.admin_users (email)
values ('buildwithtattva@gmail.com')
on conflict (email) do nothing;

commit;
