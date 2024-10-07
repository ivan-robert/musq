create or replace function fetch_exos(user_id uuid)
returns jsonb AS $$
  SELECT json_agg(
    json_build_object(
      'exo_id', e.exo_id,
      'exo_nom', e.exo_nom,
      'description', e.description,
      'exo_type', e.exo_type,
      'is_official', e.is_official,
      'added_by', e.added_by,
      'muscles', muscles_agg.muscles
    )
  ) FROM exos e
  LEFT JOIN (
    SELECT em.exo_id, json_object_agg(m.muscle_name, em.engagement_level) as muscles
    FROM exos_muscles em
    JOIN muscles m ON em.muscle_id = m.muscle_id
    GROUP BY em.exo_id
  ) muscles_agg ON e.exo_id = muscles_agg.exo_id
  WHERE e.is_official = true OR e.added_by = user_id;
$$ language sql;