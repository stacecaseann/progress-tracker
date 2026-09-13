import { Goal } from "./Goal.js";
import type { StreakGoalData, StreakGoalUpdates } from "./StreakGoalData.js";
import type { GoalType } from "./GoalType.js";
import type { CheckIn } from "../checkIns/CheckIn.js";
import type { GoalProgress } from "./GoalProgress.js";
import { addDay } from "./dateUtil.js";

export class StreakGoal extends Goal {
  readonly type: GoalType = "streak";
  public value: number;
  public dateBy: Date | undefined;

  constructor(data: StreakGoalData) {
    super(data);
    this.value = data.value;
    this.dateBy = data.dateBy;
  }

  override updateGoal(updateData: StreakGoalUpdates): StreakGoal {
    return new StreakGoal({
      ...this,
      ...updateData,
    });
  }
  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit} every day${this.dateBy === undefined ? "" : " until " + this.dateBy.toLocaleDateString()}`;
  }

  override calculateProgress(checkIns: CheckIn[]): GoalProgress {
    //need to see how many days in a row they have made it
    //You have a streak of _ days
    const filteredCheckIns = checkIns.filter(
      (checkIn) => checkIn.goalId === this.id
    );
    return this.calculateStreak(filteredCheckIns);
  }

  calculateStreak(checkIns: CheckIn[]): GoalProgress {
    const totalsByDay = new Map<string, number>();
    checkIns.forEach((checkIn) => {
      const day = checkIn.checkInDate.toDateString();
      const currentTotal = totalsByDay.get(day) ?? 0;
      totalsByDay.set(day, currentTotal + checkIn.value);
    });

    const completedDays: string[] = [...totalsByDay.entries()] //flatten to array
      .filter(([, total]) => total >= this.value) //destructure array, forget the first field
      .map(([day]) => day) //grab the first item
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); //sort loops through and gives a and b to compare

    //now I have the dates in order that meet the requirement of the daily value

    let streak = 1;
    for (let i = 1; i < completedDays.length; i++) {
      const currentDate = new Date(completedDays[i]!);
      const prevDate = new Date(completedDays[i - 1]!);
      if (addDay(prevDate).getTime() === currentDate.getTime()) streak += 1;
      else streak = 1;
    }

    return {
      value: streak,
      description: `You have a streak of ${streak} days!`,
    };
  }
  override toData(): StreakGoalData {
    return {
      id: this.id,
      name: this.name,
      type: "streak",
      startDate: this.startDate,
      value: this.value,
      valueUnit: this.valueUnit,
      dateBy: this.dateBy,
    };
  }
}
