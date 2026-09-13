import type { GoalType } from "./GoalType.js";
import { Goal } from "./Goal.js";
import type { CountGoalData, CountGoalUpdates } from "./CountGoalData.js";
import type { CheckIn } from "../checkIns/CheckIn.js";
import type { GoalProgress } from "./GoalProgress.js";

export class CountGoal extends Goal {
  readonly type: GoalType = "count";

  constructor(data: CountGoalData) {
    super(data);
  }

  override updateGoal(updateData: CountGoalUpdates): CountGoal {
    return new CountGoal({
      ...this,
      ...updateData,
    });
  }

  override calculateProgress(checkIns: CheckIn[]): GoalProgress {
    const total = checkIns
    .filter((checkIn) => checkIn.goalId === this.id)
    .reduce((total, checkIn) => total + checkIn.value, 0);
    return {
      value: total,
      description: `${total} ${this.valueUnit} completed!`,
    };
  }

  get description(): string {
    return `${this.name} (count ${this.valueUnit})`;
  }

  override toData(): CountGoalData {
    return {
      id: this.id,
      name: this.name,
      type: "count",
      startDate: this.startDate,
      valueUnit: this.valueUnit,
    };
  }
}
