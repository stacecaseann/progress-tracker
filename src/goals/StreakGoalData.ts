import type { GoalData } from "./GoalData.js";

export type StreakGoalData = GoalData;
export type StreakGoalUpdates = Partial<Omit<StreakGoalData, "id">>;
