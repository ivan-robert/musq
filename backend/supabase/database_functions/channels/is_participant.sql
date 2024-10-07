create or replace function is_participant(
  channel_id uuid,
  user_id uuid
) returns boolean as $$
  select exists(
    select 1
    from channels_participants cp
    where cp.channel_id = $1
    and cp.user_id = $2
  );
$$ language sql;