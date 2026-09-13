import type { GoalType } from "./GoalType.js";
import type { CheckIn } from "../checkIns/CheckIn.js";
import type { GoalProgress } from "./GoalProgress.js";
import { Goal } from "./Goal.js";
import type {
  ProgressGoalData,
  ProgressGoalUpdates,
} from "./ProgressGoalData.js";

export class ProgressGoal extends Goal {
  public value: number;
  public dateBy: Date | undefined;
  readonly type: GoalType = "progress";

  constructor(data: ProgressGoalData) {
    super(data);
    this.value = data.value;
    this.dateBy = data.dateBy;
  }

  override updateGoal(updateData: ProgressGoalUpdates): ProgressGoal {
    return new ProgressGoal({
      ...this,
      ...updateData,
    });
  }

  override calculateProgress(checkIns: CheckIn[]): GoalProgress {
    const filteredCheckIns = checkIns.filter((checkIn) => checkIn.goalId === this.id);
    let total = 0;
    const dateBy = this.dateBy; //for this narrowing to work, I can't use this.dateBy in my else and have it assume it's undefined
    if (dateBy === undefined) {
      total = filteredCheckIns.reduce((total, checkIn) => total + checkIn.value, 0);
    } else {
      total = filteredCheckIns
        .filter((checkIn) => checkIn.checkInDate <= dateBy)
        .reduce((total, checkIn) => total + checkIn.value, 0);
    }
    return {
      value: total,
      description: `You completed ${total}/${this.value} ${this.valueUnit}!`,
    };
  }

  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit}${this.dateBy === undefined ? "" : " by " + this.dateBy.toLocaleDateString()}`;
  }

  override toData(): ProgressGoalData {
    return {
      id: this.id,
      name: this.name,
      type: "progress",
      startDate: this.startDate,
      value: this.value,
      valueUnit: this.valueUnit,
      dateBy: this.dateBy,
    };
  }
}
