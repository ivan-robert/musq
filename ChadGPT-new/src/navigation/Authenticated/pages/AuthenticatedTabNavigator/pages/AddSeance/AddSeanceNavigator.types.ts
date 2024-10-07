export type AddSeanceNavigatorParamList = {
  home: undefined;
  "new-workout": undefined | { exosIdsForRedirect?: string };
  "enter-perf": { exercises: string };
  "workout-summary": undefined;
  browse: undefined;
  "folder-content": { folderId: number };
};
