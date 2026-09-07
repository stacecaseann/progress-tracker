import type { GoalType } from "./GoalType.js";
import type { ValueUnit } from "./ValueUnit.js";
import type { GoalData, GoalUpdates } from "./GoalData.js";
export abstract class Goal {
  public readonly id: string;
  abstract readonly type: GoalType;
  public name: string;
  abstract get description(): string;
  public value: number;
  public valueUnit: ValueUnit;
  public dateBy: Date | undefined;
  constructor(data: GoalData) {
    this.id = data.id;
    this.name = data.name;
    this.value = data.value;
    this.valueUnit = data.valueUnit;
    this.dateBy = data.dateBy;
  }

  updateGoal(updateData: GoalUpdates): void {
    Object.assign(this, updateData);
  }
}
