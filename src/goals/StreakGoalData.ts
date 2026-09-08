import type { GoalData } from "./GoalData.js";
import type { ValueUnit } from "./ValueUnit.js";

export type StreakGoalData = GoalData & {
  value: number;
  valueUnit: ValueUnit;
  dateBy: Date | undefined;
};
export type StreakGoalUpdates = Partial<Omit<StreakGoalData, "id">>;
