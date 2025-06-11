-- Create the public-images bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('public-images', 'public-images', true)
on conflict (id) do update
set public = true;

-- Update bucket settings
update storage.buckets
set
  file_size_limit = 52428800, -- 50MB
  allowed_mime_types = array['image/*']
where id = 'public-images';

-- Create module_templates table if it doesn't exist
create table if not exists public.module_templates (
  id uuid default uuid_generate_v4() primary key,
  type text not null,
  category text not null,
  title text not null,
  description text,
  default_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on module type for faster lookups
create index if not exists idx_module_templates_type
on public.module_templates(type);

-- Storage Policies

-- Allow public read access to all images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'public-images' );

-- Allow authenticated uploads
create policy "Authenticated Uploads"
on storage.objects for insert
with check (
  bucket_id = 'public-images'
  and auth.role() = 'authenticated'
);

-- Allow users to update their own files
create policy "User Update Access"
on storage.objects for update
using (
  bucket_id = 'public-images'
  and (storage.foldername(name))[1] = 'user'
  and (storage.foldername(name))[2] = auth.uid()::text
);

-- Allow users to delete their own files
create policy "User Delete Access"
on storage.objects for delete
using (
  bucket_id = 'public-images'
  and (storage.foldername(name))[1] = 'user'
  and (storage.foldername(name))[2] = auth.uid()::text
);

-- Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for module_templates
create trigger set_updated_at
  before update on public.module_templates
  for each row
  execute function public.handle_updated_at();

-- Create RLS policies for module_templates
alter table public.module_templates enable row level security;

create policy "Public Read Access"
on public.module_templates for select
to public
using (true);

create policy "Authenticated Insert Access"
on public.module_templates for insert
to authenticated
with check (true);

create policy "Authenticated Update Access"
on public.module_templates for update
to authenticated
using (true);

create policy "Authenticated Delete Access"
on public.module_templates for delete
to authenticated
using (true); 