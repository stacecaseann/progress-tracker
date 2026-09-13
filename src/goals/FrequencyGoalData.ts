import type { FrequencyUnit } from "./FrequencyUnit.js";
import type { GoalData } from "./GoalData.js";

export type FrequencyGoalData = GoalData & {
  type: "frequency";
  value: number;
  frequency: number;
  frequencyUnit: FrequencyUnit;
  dateBy: Date | undefined;
};

export type FrequencyGoalUpdates = Partial<Omit<FrequencyGoalData, "id">>;
