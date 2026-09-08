import type { GoalData } from "./GoalData.js";
import type { ValueUnit } from "./ValueUnit.js";

export type CountGoalData = GoalData & {
  valueUnit: ValueUnit;
};

export type CountGoalUpdates = Partial<Omit<CountGoalData, "id">>;
