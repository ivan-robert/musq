CREATE OR REPLACE FUNCTION smart_fetch_seances_with_dates(min_date timestamp with time zone, max_date timestamp with time zone,input_user_id UUID)
RETURNS JSONB AS $$

SELECT assemble_seances(
    (
        SELECT json_agg(row_to_json(t))::jsonb
        FROM (
            SELECT seance_id, start_date, user_id, salle_id, seance_types, end_date
            FROM seances
            WHERE user_id = input_user_id
            AND start_date >= min_date
            AND end_date <= max_date
            ORDER BY start_date DESC
        ) t
    ),
    input_user_id
)

$$ LANGUAGE sql STABLE;



