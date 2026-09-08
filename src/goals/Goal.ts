import type { GoalType } from "./GoalType.js";

import type { GoalData, GoalUpdates } from "./GoalData.js";
export abstract class Goal {
  public readonly id: string;
  abstract readonly type: GoalType;
  public name: string;
  abstract get description(): string;

  constructor(data: GoalData) {
    this.id = data.id;
    this.name = data.name;
  }

  abstract updateGoal(updateData: GoalUpdates): Goal;
}
