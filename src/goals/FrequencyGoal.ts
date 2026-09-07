import type { GoalType } from "./GoalType.js";
import { Goal } from "./Goal.js";
import type { FrequencyGoalData } from "./FrequencyGoalData.js";

export class FrequencyGoal extends Goal {
  readonly type: GoalType = "frequency";
  constructor(data: FrequencyGoalData) {
    super(data);
  }

  get description(): string {
    return `${this.name} ${this.value} times per ${this.valueUnit}${this.dateBy === undefined ? "" : " by " + this.dateBy}`;
  }
}
