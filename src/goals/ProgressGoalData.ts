import type { FrequencyUnit } from "./FrequencyUnit.js";
import type { GoalData } from "./GoalData.js";

export type ProgressGoalData = GoalData & {
  frequency: number;
  frequencyUnit: FrequencyUnit;
};

export type ProgressGoalUpdates = Partial<Omit<ProgressGoalData, "id">>;
