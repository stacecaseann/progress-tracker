import type { GoalType } from "./GoalType.js";
import type { CheckIn } from "../checkIns/CheckIn.js";
import type { GoalData, GoalUpdates } from "./GoalData.js";
import type { GoalProgress } from "./GoalProgress.js";
import type { AllGoalData } from "./AllGoalData.js";
import type { ValueUnit } from "./ValueUnit.js";

//This is the base goal class. It is abstract so it can't be created, it can only be extended
//Each function is a skeleton of what the goal must have on it's own goal type
export abstract class Goal {
  public readonly id: string;
  abstract readonly type: GoalType;
  public name: string;
  public startDate: Date;
  public valueUnit: ValueUnit;

  abstract get description(): string;

  constructor(data: GoalData) {
    this.id = data.id;
    this.name = data.name;
    this.startDate = data.startDate;
    this.valueUnit = data.valueUnit;
  }

  abstract updateGoal(updateData: GoalUpdates): Goal;

  abstract calculateProgress(checkIns: CheckIn[], endDate: Date): GoalProgress;

  abstract toData(): AllGoalData;
}
