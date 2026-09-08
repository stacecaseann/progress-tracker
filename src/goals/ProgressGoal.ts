import type { GoalType } from "./GoalType.js";
import type { ValueUnit } from "./ValueUnit.js";
import { Goal } from "./Goal.js";
import type {
  ProgressGoalData,
  ProgressGoalUpdates,
} from "./ProgressGoalData.js";

export class ProgressGoal extends Goal {
  public value: number;
  public valueUnit: ValueUnit;
  public dateBy: Date | undefined;
  readonly type: GoalType = "progress";

  constructor(data: ProgressGoalData) {
    super(data);
    this.value = data.value;
    this.valueUnit = data.valueUnit;
    this.dateBy = data.dateBy;
  }

  override updateGoal(updateData: ProgressGoalUpdates): ProgressGoal {
    return new ProgressGoal({
      ...this,
      ...updateData,
    });
  }
  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit}${this.dateBy === undefined ? "" : " by " + this.dateBy.toLocaleDateString()}`;
  }
}
