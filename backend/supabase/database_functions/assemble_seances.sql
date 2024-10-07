CREATE
OR REPLACE FUNCTION assemble_seances (seance_data jsonb, input_user_id uuid) RETURNS JSONB AS $$

WITH seances_reversed AS (
    SELECT 
        seance_id, 
        start_date, 
        user_id, 
        salle_id, 
        seance_types, 
        end_date,
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS rn
    FROM 
        jsonb_to_recordset(seance_data) AS x(seance_id uuid, start_date timestamp with time zone, user_id uuid, salle_id uuid, seance_types text[], end_date timestamp with time zone)
),
seances_id_to_fetch AS (
    SELECT 
        seance_id, 
        start_date, 
        user_id, 
        salle_id, 
        seance_types, 
        end_date
    FROM 
        seances_reversed
    ORDER BY 
        rn DESC
),
perfs_to_fetch AS (
    SELECT 
        p.perf_id, p.exo_id, s.seance_id
    FROM 
        perfs p
        JOIN seances_id_to_fetch s USING(seance_id)
),

sets_by_perf as (
    SELECT
    perfs_to_fetch.perf_id,
    (SELECT json_agg(json_build_object(
        'rest_in_seconds',sets.rest_in_seconds,
        'set_id', sets.set_id,
        'perf_id', sets.perf_id,
        'time_in_seconds', sets.time_in_seconds,
        'weight', sets.weight,
        'reps', sets.reps,
        'failure', sets.failure))) as sets
    FROM 
        perfs_to_fetch
    LEFT JOIN sets on sets.perf_id = perfs_to_fetch.perf_id
    group by perfs_to_fetch.perf_id
),

full_perfs AS (
    SELECT
        perfs_to_fetch.seance_id,
        perfs_to_fetch.perf_id,
        perfs_to_fetch.exo_id,
        sets_by_perf.sets
    FROM 
        perfs_to_fetch
    JOIN sets_by_perf on sets_by_perf.perf_id = perfs_to_fetch.perf_id
)

SELECT json_agg(
    json_build_object(
        'seance_id', s.seance_id,
        'start_date', s.start_date,
        'end_date', s.end_date,
        'salle_nom', sl.salle_nom,
        'user_id', s.user_id,
        'salle_id', sl.salle_id,
        'seance_types', s.seance_types,
        'perfs', (SELECT json_agg(
                            json_build_object(
                                'perf_id', fp.perf_id,
                                'exo_id', fp.exo_id, 
                                'sets', fp.sets
                            )
                          )
                  FROM full_perfs fp
                  WHERE fp.seance_id = s.seance_id)
    )
) FROM seances_id_to_fetch s
JOIN salles sl ON s.salle_id = sl.salle_id;

$$ LANGUAGE sql STABLE;
