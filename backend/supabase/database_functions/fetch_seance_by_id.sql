CREATE OR REPLACE FUNCTION fetch_seance_by_id(input_seance_id uuid, input_user_id UUID)
RETURNS JSONB AS $$

SELECT assemble_seances(
    (
        SELECT json_agg(row_to_json(t))::jsonb
        FROM (
            SELECT seance_id, start_date, user_id, salle_id, seance_types, end_date
            FROM seances
            WHERE seance_id = input_seance_id
        ) t
    ),
    input_user_id
)

$$ LANGUAGE sql STABLE;