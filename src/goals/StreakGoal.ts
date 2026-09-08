import { Goal } from "./Goal.js";
import type { StreakGoalData, StreakGoalUpdates } from "./StreakGoalData.js";
import type { GoalType } from "./GoalType.js";
import type { ValueUnit } from "./ValueUnit.js";
export class StreakGoal extends Goal {
  readonly type: GoalType = "streak";
  public value: number;
  public valueUnit: ValueUnit;
  public dateBy: Date | undefined;

  constructor(data: StreakGoalData) {
    super(data);
    this.value = data.value;
    this.valueUnit = data.valueUnit;
    this.dateBy = data.dateBy;
  }

  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit} every day${this.dateBy === undefined ? "" : " until " + this.dateBy.toLocaleDateString()}`;
  }
  override updateGoal(updateData: StreakGoalUpdates): StreakGoal {
    return new StreakGoal({
      ...this,
      ...updateData,
    });
  }
}
