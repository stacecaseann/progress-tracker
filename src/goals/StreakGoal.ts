import { Goal } from "./Goal.js";
import type { StreakGoalData } from "./StreakGoalData.js";
import type { GoalType } from "./GoalType.js";

export class StreakGoal extends Goal {
  readonly type: GoalType = "streak";

  constructor(data: StreakGoalData) {
    super(data);
  }

  get description(): string {
    return `${this.name} ${this.value} times per ${this.valueUnit}${this.dateBy === undefined ? "" : " by " + this.dateBy}`;
  }
}
