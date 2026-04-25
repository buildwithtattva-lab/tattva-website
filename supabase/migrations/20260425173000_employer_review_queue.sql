begin;

-- Add admin_notes and updated_at to employer_inquiries if they don't exist
alter table if exists public.employer_inquiries 
    add column if not exists admin_notes text,
    add column if not exists updated_at timestamp with time zone default now();

-- Create a view for employer inquiry review
create or replace view public.employer_review_queue as
select
    id::text as inquiry_id,
    institution_name,
    contact_person,
    email,
    phone,
    roles_needed,
    message,
    status,
    admin_notes,
    created_at,
    updated_at
from public.employer_inquiries;

-- Ensure authenticated users (admins) can select from the view
grant select on public.employer_review_queue to authenticated;

commit;
