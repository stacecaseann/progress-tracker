import type { GoalType } from "./GoalType.js";
import { Goal } from "./Goal.js";
import type { FrequencyUnit } from "./FrequencyUnit.js";
import type { CheckIn } from "../checkIns/CheckIn.js";
import type { GoalProgress } from "./GoalProgress.js";
import { addWeek, weeksBetween, addMonth, monthsBetween } from "./dateUtil.js";

import type {
  FrequencyGoalData,
  FrequencyGoalUpdates,
} from "./FrequencyGoalData.js";

export class FrequencyGoal extends Goal {
  public value: number;
  public frequency: number;
  public frequencyUnit: FrequencyUnit;
  public dateBy: Date | undefined;

  readonly type: GoalType = "frequency";
  constructor(data: FrequencyGoalData) {
    super(data);
    this.value = data.value;
    this.frequency = data.frequency;
    this.frequencyUnit = data.frequencyUnit;
    this.dateBy = data.dateBy;
  }

  calculateFrequency(): string {
    if (this.frequency === 1 && this.frequencyUnit === "day") {
      return "every day";
    }

    if (this.frequencyUnit === "week" || this.frequencyUnit === "month") {
      return `${this.frequency} times per ${this.frequencyUnit}`;
    }

    return "";
  }

  override updateGoal(updateData: FrequencyGoalUpdates): FrequencyGoal {
    return new FrequencyGoal({
      ...this,
      ...updateData,
    });
  }

  get description(): string {
    return `${this.name} ${this.value} ${this.valueUnit} a day ${this.calculateFrequency()}${this.dateBy === undefined ? "" : " until " + this.dateBy.toLocaleDateString()}`;
  }

  override calculateProgress(checkIns: CheckIn[], endDate: Date): GoalProgress {
    const filteredCheckIns = checkIns.filter(
      (checkIn) => checkIn.goalId === this.id
    );
    if (this.frequencyUnit === "month") {
      return this.calculateMonthlyProgress(filteredCheckIns, endDate);
    } else {
      return this.calculateDailyOrWeeklyProgress(filteredCheckIns, endDate);
    }
  }

  calculateMonthlyProgress(checkIns: CheckIn[], endDate: Date): GoalProgress {
    //Don't add up total hours, use 20 min/day, count the days that was reached.
    const monthsOfGoal = monthsBetween(this.startDate, endDate);
    let completedMonths = 0;
    let monthStart = this.startDate;
    for (let i = 0; i < monthsOfGoal; i++) {
      let monthEnd = addMonth(monthStart);
      const monthCheckIns = checkIns.filter(
        (checkIn) =>
          checkIn.checkInDate < monthEnd && checkIn.checkInDate >= monthStart
      );

      const totalsByDay = new Map<string, number>();
      //need to loop through months actually
      monthCheckIns.forEach((checkIn) => {
        const day = checkIn.checkInDate.toDateString();
        const currentTotal = totalsByDay.get(day) ?? 0;
        totalsByDay.set(day, currentTotal + checkIn.value);
      });

      const completedDays = [...totalsByDay.values()].filter(
        (total) => total >= this.value
      ).length;
      if (completedDays >= this.frequency) {
        completedMonths++;
      }
      monthEnd = addMonth(monthStart);
    }
    return {
      value: completedMonths,
      description: `You completed ${this.value} ${this.valueUnit} ${this.frequency} days/${this.frequencyUnit} ${completedMonths} out of ${monthsOfGoal} month(s)!`,
    };
  }

  calculateDailyOrWeeklyProgress(
    checkIns: CheckIn[],
    endDate: Date
  ): GoalProgress {
    const weeksOfGoal = weeksBetween(this.startDate, endDate);
    let completedWeeks = 0;
    let frequency = this.frequency;
    if (this.frequencyUnit === "day") frequency = 7;
    let weekStart = this.startDate;
    for (let i = 0; i < weeksOfGoal; i++) {
      const weekEnd = addWeek(weekStart);
      const weekCheckIns = checkIns.filter(
        (checkIn) =>
          checkIn.checkInDate < weekEnd && checkIn.checkInDate >= weekStart
      );

      const totalsByDay = new Map<string, number>();

      weekCheckIns.forEach((checkIn) => {
        const day = checkIn.checkInDate.toDateString();
        const currentTotal = totalsByDay.get(day) ?? 0;
        totalsByDay.set(day, currentTotal + checkIn.value);
      });
      const completedDays = [...totalsByDay.values()].filter(
        (total) => total >= this.value
      ).length;
      if (completedDays >= frequency) {
        completedWeeks++;
      }
      weekStart = weekEnd;
    }
    return {
      value: completedWeeks,
      description:
        this.frequencyUnit === "week"
          ? `You completed ${this.value} ${this.valueUnit} ${this.frequency} days/${this.frequencyUnit} ${completedWeeks} out of ${weeksOfGoal} weeks!`
          : `You completed ${this.value} ${this.valueUnit} every day for ${completedWeeks} out of ${weeksOfGoal} weeks!`,
    };
  }

  override toData(): FrequencyGoalData {
    return {
      id: this.id,
      name: this.name,
      type: "frequency",
      startDate: this.startDate,
      value: this.value,
      valueUnit: this.valueUnit,
      frequency: this.frequency,
      frequencyUnit: this.frequencyUnit,
      dateBy: this.dateBy,
    };
  }
}
