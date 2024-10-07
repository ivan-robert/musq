create or replace function send_message(
  channel_id uuid,
  user_id uuid,
  message_text text
) returns uuid as $$
  insert into messages (channel_id, user_id, content)
  values ($1, $2, $3)
    returning message_id;
$$ language sql;