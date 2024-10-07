CREATE OR REPLACE FUNCTION smart_fetch_seances(fetch_limit integer, fetch_offset integer, input_user_id UUID)
RETURNS JSONB AS $$

SELECT assemble_seances(
    (
        SELECT json_agg(row_to_json(t))::jsonb
        FROM (
            SELECT seance_id, start_date, user_id, salle_id, seance_types, end_date
            FROM seances
            WHERE user_id = input_user_id
            ORDER BY start_date DESC
            OFFSET fetch_offset
            LIMIT fetch_limit
        ) t
    ),
    input_user_id
)

$$ LANGUAGE sql STABLE;



