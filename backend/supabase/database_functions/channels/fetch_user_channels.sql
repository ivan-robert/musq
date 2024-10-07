CREATE
OR REPLACE FUNCTION fetch_user_channels (
  user_id UUID,
  is_support_channel BOOLEAN DEFAULT false
) RETURNS TABLE (
  channel_id UUID,
  channel_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  creator_id UUID, -- Assuming creator_id is of type UUID, change if different
  is_support BOOLEAN,
  participants_names TEXT[] -- Assuming array of TEXT, change if different
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    channels.channel_id,
    channels.channel_name, -- Assuming the actual column name for channel name
    channels.created_at,
    channels.creator_id,
    channels.is_support,
    ARRAY(
      SELECT profiles.username -- Assuming you want usernames from profiles
      FROM profiles
      JOIN channels_participants ON profiles.id = channels_participants.user_id
      WHERE channels_participants.channel_id = channels.channel_id
    ) AS participants_names
  FROM
    channels
  JOIN
    channels_participants ON channels.channel_id = channels_participants.channel_id
  WHERE
    channels_participants.user_id = $1 AND
    channels.is_support = $2
  ORDER BY
    channels.created_at DESC;
END;
$$ LANGUAGE plpgsql;
