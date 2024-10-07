create or replace function invite_to_channel(
    channel_id uuid,
    inviter_id uuid,
    invitee_id uuid
    ) returns boolean as $$
    insert into channels_participants (channel_id, user_id)
    values ($1, $3)
    returning true;
$$ language sql;