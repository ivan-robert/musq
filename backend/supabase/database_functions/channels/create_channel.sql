CREATE OR REPLACE FUNCTION create_channel (
  channel_name TEXT,
  is_support BOOLEAN,
  creator_id UUID
) RETURNS UUID AS $$
DECLARE
  -- Variable to hold the new channel_id
  new_channel_id UUID;
BEGIN
  -- Insert the new channel and return the new ID into the variable
  INSERT INTO channels (created_at, is_support, channel_name, creator_id)
  VALUES (now(), $2, $1, $3)
  RETURNING channel_id INTO new_channel_id;

  INSERT INTO channels_participants(channel_id, user_id)
  VALUES(new_channel_id, $3);
  
  -- Return the new channel_id
  RETURN new_channel_id;
END;
$$ LANGUAGE plpgsql;
