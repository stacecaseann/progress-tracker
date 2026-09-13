import { Goal } from "./Goal.js";
import {
  readGoalsFromFile,
  saveGoalsToFile,
  readCheckInsFromFile,
  saveCheckInsToFile,
} from "../files/fileUtil.js";
import type { CheckIn } from "../checkIns/CheckIn.js";
import { CountGoal } from "./CountGoal.js";
import { FrequencyGoal } from "./FrequencyGoal.js";
import { ProgressGoal } from "./ProgressGoal.js";
import { StreakGoal } from "./StreakGoal.js";

export function addGoal(goals: Goal[], goal: Goal) {
  return [...goals, goal];
}

export function removeGoal(goals: Goal[], goalId: string) {
  return goals.filter((g) => g.id != goalId);
}

export function updateGoal(goals: Goal[], updatedGoal: Goal): Goal[] {
  return goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal));
}

export async function loadGoals(): Promise<Goal[]> {
  const goalDataDto = await readGoalsFromFile();
  const goalData: Goal[] = goalDataDto.map((goal) => {
    switch (goal.type) {
      case "count":
        return new CountGoal({ ...goal, startDate: new Date(goal.startDate) });
      case "frequency":
        return new FrequencyGoal({
          ...goal,
          dateBy: goal.dateBy ? new Date(goal.dateBy) : undefined,
          startDate: new Date(goal.startDate),
        });
      case "progress":
        return new ProgressGoal({
          ...goal,
          dateBy: goal.dateBy ? new Date(goal.dateBy) : undefined,
          startDate: new Date(goal.startDate),
        });
      case "streak":
        return new StreakGoal({
          ...goal,
          dateBy: goal.dateBy ? new Date(goal.dateBy) : undefined,
          startDate: new Date(goal.startDate),
        });
      default:
        throw new Error(`Goal Type is not supported`);
    }
  });
  return goalData;
}

export async function saveGoals(goals: Goal[]) {
  const goalDataDto = goals.map((goalDto) => goalDto.toData());
  await saveGoalsToFile(goalDataDto);
}

export async function loadCheckIns(): Promise<CheckIn[]> {
  const checkInData = await readCheckInsFromFile();
  //I did need help to fix my json being in utc time to converting to local time.
  const checkIns: CheckIn[] = checkInData.map((checkInDto) => {
    const [year, month, day] = checkInDto.checkInDate.split("-").map(Number);

    return {
      ...checkInDto,
      checkInDate: new Date(year!, month! - 1, day!),
    };
  });

  return checkIns;
}

export async function saveCheckIns(checkIns: CheckIn[]) {
  const checkInsToSave = checkIns.map((checkIn) => ({
    ...checkIn,
    checkInDate: checkIn.checkInDate.toLocaleDateString(),
  }));
  await saveCheckInsToFile(checkInsToSave);
}
