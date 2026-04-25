begin;

-- Ensure the password column exists (the user added it manually, but for safety in migrations)
alter table if exists public.admin_users 
    add column if not exists password text;

-- Create an RPC to verify admin login
create or replace function public.verify_admin_login(p_email text, p_password text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
    return exists (
        select 1 
        from public.admin_users 
        where email = p_email 
        and password = p_password
    );
end;
$$;

commit;
