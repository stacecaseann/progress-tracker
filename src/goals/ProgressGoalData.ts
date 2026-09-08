import type { GoalData } from "./GoalData.js";
import type { ValueUnit } from "./ValueUnit.js";
export type ProgressGoalData = GoalData & {
  value: number;
  valueUnit: ValueUnit;
  dateBy: Date | undefined;
};

export type ProgressGoalUpdates = Partial<Omit<ProgressGoalData, "id">>;
