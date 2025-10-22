-- Create users table
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;

-- Create policies for users table
create policy "Users can view their own user"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can insert their own user"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own user"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can delete their own user"
  on public.users for delete
  using (auth.uid() = id);
