import type { GoalData } from "./GoalData.js";

export type ProgressGoalData = GoalData & {
  type: "progress";
  value: number;
  dateBy: Date | undefined;
};

export type ProgressGoalUpdates = Partial<Omit<ProgressGoalData, "id">>;
