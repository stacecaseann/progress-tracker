import type { GoalType } from "./GoalType.js";
import { Goal } from "./Goal.js";
import type { FrequencyUnit } from "./FrequencyUnit.js";
import type { ValueUnit } from "./ValueUnit.js";
import type {
  FrequencyGoalData,
  FrequencyGoalUpdates,
} from "./FrequencyGoalData.js";

export class FrequencyGoal extends Goal {
  public value: number;
  public valueUnit: ValueUnit;
  public frequency: number;
  public frequencyUnit: FrequencyUnit;
  public dateBy: Date | undefined;

  readonly type: GoalType = "frequency";
  constructor(data: FrequencyGoalData) {
    super(data);
    this.value = data.value;
    this.valueUnit = data.valueUnit;
    this.frequency = data.frequency;
    this.frequencyUnit = data.frequencyUnit;
    this.dateBy = data.dateBy;
  }

  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit} a day ${this.calculateFrequency()}${this.dateBy === undefined ? "" : " until " + this.dateBy.toLocaleDateString()}`;
  }

  calculateFrequency() {
    let frequencyString = "";
    if (this.frequency === 1 && this.frequencyUnit === "day")
      frequencyString = "every day";
    //not 1 and day doesn't make sense, don't allow it
    else if (this.frequencyUnit === "week")
      frequencyString = `${this.frequency} times per ${this.frequencyUnit}`;
    return frequencyString;
  }

  override updateGoal(updateData: FrequencyGoalUpdates): FrequencyGoal {
    return new FrequencyGoal({
      ...this,
      ...updateData,
    });
  }
}
