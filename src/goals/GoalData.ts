import type { GoalType } from "./GoalType.js";
import type { ValueUnit } from "./ValueUnit.js";
export type GoalData = {
  id: string;
  name: string;
  type: GoalType;
  startDate: Date;
  valueUnit: ValueUnit;
};

export type GoalUpdates = Partial<Omit<GoalData, "id">>;
