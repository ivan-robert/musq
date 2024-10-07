create or replace function list_participants(
  channel_id uuid
) returns table (user_id uuid, username text) as $$
  select cp.user_id, p.username
  from profiles p
  join channels_participants cp
  on p.id = cp.user_id
  where cp.channel_id = $1;
$$ language sql;