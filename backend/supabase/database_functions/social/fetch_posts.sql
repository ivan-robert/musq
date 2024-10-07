DROP FUNCTION
  fetch_posts (uuid, integer, integer);

CREATE
OR REPLACE FUNCTION fetch_posts (
  input_user_id UUID,
  results_limit INT,
  results_offset INT
) RETURNS TABLE (
  post_id UUID,
  created_at TIMESTAMP with time zone,
  illustration_link TEXT,
  user_id UUID,
  workout_id UUID,
  title TEXT,
  description TEXT,
  number_of_likes BIGINT,
  number_of_comments BIGINT
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT 
        posts.post_id, 
        posts.created_at, 
        posts.illustration_links, 
        posts.user_id, 
        posts.workout_id, 
        posts.title, 
        posts.description,
        (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.post_id) AS number_of_likes,
        (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.post_id) AS number_of_comments
    FROM posts
    WHERE posts.user_id = input_user_id
       OR posts.user_id IN (
           SELECT followers.destination
           FROM followers
           WHERE followers.source = input_user_id
       )
    ORDER BY posts.created_at DESC
    LIMIT results_limit
    OFFSET results_offset;
END;
$$;
