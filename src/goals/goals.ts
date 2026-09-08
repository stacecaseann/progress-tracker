import { Goal } from "./Goal.js";

export function addGoal(goals: Goal[], goal: Goal) {
  return [...goals, goal];
}

export function removeGoal(goals: Goal[], goalId: string) {
  return goals.filter((g) => g.id != goalId);
}

export function updateGoal(goals: Goal[], updatedGoal: Goal): Goal[] {
  return goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal));
}
