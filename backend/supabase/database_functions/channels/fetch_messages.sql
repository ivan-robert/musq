CREATE
OR REPLACE FUNCTION fetch_messages (channel_id uuid, min_index int, max_index int) RETURNS TABLE (
  creation_date timestamp with time zone,
  content text,
  user_name text,
  user_id uuid,
  message_id uuid
) AS $$
BEGIN
    RETURN QUERY
    WITH full_messages AS (
        SELECT 
            profiles.username AS user_name,
            messages.content,
            messages.created_at AS creation_date,
            messages.user_id,
            messages.message_id
        FROM messages
        JOIN profiles ON messages.user_id = profiles.id
        WHERE messages.channel_id = $1
    )
    SELECT 
        full_messages.creation_date,
        full_messages.content,
        full_messages.user_name,
        full_messages.user_id,
        full_messages.message_id
    FROM full_messages 
    ORDER BY creation_date DESC 
    OFFSET $2 LIMIT $3 - $2;
END;
$$ LANGUAGE plpgsql;
