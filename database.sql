
create table rooms (
  id text primary key,
  name text,
  password text
);

create table items (
  id uuid default uuid_generate_v4() primary key,
  room_id text,
  name text,
  price numeric,
  quantity int
);
