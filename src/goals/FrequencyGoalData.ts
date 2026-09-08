import type { FrequencyUnit } from "./FrequencyUnit.js";
import type { ValueUnit } from "./ValueUnit.js";
import type { GoalData } from "./GoalData.js";

export type FrequencyGoalData = GoalData & {
  value: number;
  valueUnit: ValueUnit;
  frequency: number;
  frequencyUnit: FrequencyUnit;
  dateBy: Date | undefined;
};

export type FrequencyGoalUpdates = Partial<Omit<FrequencyGoalData, "id">>;
