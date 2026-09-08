import type { GoalType } from "./GoalType.js";
import type { ValueUnit } from "./ValueUnit.js";
import { Goal } from "./Goal.js";
import type { CountGoalData, CountGoalUpdates } from "./CountGoalData.js";

export class CountGoal extends Goal {
  readonly type: GoalType = "count";
  public valueUnit: ValueUnit;
  constructor(data: CountGoalData) {
    super(data);
    this.valueUnit = data.valueUnit;
  }

  override updateGoal(updateData: CountGoalUpdates): CountGoal {
    return new CountGoal({
      ...this,
      ...updateData,
    });
  }

  get description(): string {
    return `${this.name} (count ${this.valueUnit})`;
  }
}
