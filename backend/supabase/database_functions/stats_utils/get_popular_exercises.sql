CREATE
OR REPLACE FUNCTION get_popular_exercises (
  min_date timestamp with time zone,
  max_date timestamp with time zone,
  display_limit bigint
) RETURNS TABLE (exo_id TEXT, count bigint) AS $$
BEGIN
    RETURN QUERY
    SELECT perfs.exo_id, COUNT(*) AS count
    FROM perfs
    JOIN seances ON perfs.seance_id = seances.seance_id
    WHERE seances.start_date >= $1 AND seances.end_date <= $2
    GROUP BY perfs.exo_id
    ORDER BY count DESC
    LIMIT $3;
END; $$ LANGUAGE plpgsql;