import type { GoalType } from "./GoalType.js";
import type { FrequencyUnit } from "./FrequencyUnit.js";
import { Goal } from "./Goal.js";
import type {
  ProgressGoalData,
  ProgressGoalUpdates,
} from "./ProgressGoalData.js";

export class ProgressGoal extends Goal {
  public frequency: number;
  public frequencyUnit: FrequencyUnit;
  readonly type: GoalType = "progress";

  constructor(data: ProgressGoalData) {
    super(data);
    this.frequency = data.frequency;
    this.frequencyUnit = data.frequencyUnit;
  }

  override updateGoal(updateData: ProgressGoalUpdates): void {
    Object.assign(this, updateData);
  }

  get description(): string {
    return `${this.name} ${this.value} times per ${this.valueUnit}${this.dateBy === undefined ? "" : " by " + this.dateBy}`;
  }
}
