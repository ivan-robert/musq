import { SessionsStats } from "#modules/Statistics/SessionsStats/domain/sessionStats.types";
import { SessionsStatsDTO } from "#modules/Statistics/SessionsStats/infra/globalStats.dto";

export const adaptSessionsStats = (stats: SessionsStatsDTO): SessionsStats => {
  return {
    average_training_time: stats.average_training_time,
    muscle_repartion: Object.keys(stats.muscle_repartion).reduce((acc, key) => {
      if (stats.muscle_repartion[key] === 0) {
        return acc;
      }
      return { ...acc, [key]: stats.muscle_repartion[key] };
    }, {}),
    number_of_sessions: stats.number_of_sessions,
    total_training_time: stats.total_training_time,
  };
};
