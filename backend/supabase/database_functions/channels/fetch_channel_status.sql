create
or replace function fetch_channel_status (user_id uuid, channel_id uuid) RETURNS TABLE (last_message_id uuid, nb_unread_messages bigint) AS $$
BEGIN
    RETURN QUERY
    WITH last_message AS (
        SELECT message_id AS last_message_id
        FROM messages
        WHERE messages.channel_id = $2
        ORDER BY created_at DESC
        LIMIT 1
    ),
    last_read_message_creation AS (
        select messages.created_at
        FROM channels_roles
        JOIN messages
        ON channels_roles.last_message_read = messages.message_id
        where channels_roles.user_id = $1 and channels_roles.channel_id = $2
    ),
    unread_messages AS (
        SELECT COUNT(*) AS nb_unread_messages
        FROM messages
        WHERE messages.channel_id = $2
        AND created_at > (SELECT coalesce((select last_read_message_creation.created_at 
        from last_read_message_creation) , '2024-01-01T00:00:00+00:00'))
    )
    SELECT last_message.last_message_id, unread_messages.nb_unread_messages
    FROM last_message, unread_messages;
END;
$$ LANGUAGE plpgsql;
