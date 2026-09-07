import type { ValueUnit } from "./ValueUnit.ts";

export type GoalData = {
  id: string;
  name: string;
  value: number;
  valueUnit: ValueUnit;
  dateBy: Date | undefined;
};

export type GoalUpdates = Partial<Omit<GoalData, "id">>;
