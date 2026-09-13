import type { GoalData } from "./GoalData.js";

export type CountGoalData = GoalData & {
  type: "count";
};

export type CountGoalUpdates = Partial<Omit<CountGoalData, "id">>;
