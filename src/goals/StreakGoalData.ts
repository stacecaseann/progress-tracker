import type { GoalData } from "./GoalData.js";

export type StreakGoalData = GoalData & {
  type: "streak";
  value: number;
  dateBy: Date | undefined;
};
export type StreakGoalUpdates = Partial<Omit<StreakGoalData, "id">>;
