import { Goal } from "./Goal.js";
export function addGoal(goals: Goal[], goal: Goal) {
  return [...goals, goal];
}

export function removeGoal(goals: Goal[], goal: Goal) {
  return goals.filter((g) => g.id != goal.id);
}

export function updateGoal(goals: Goal[], updatedGoal: Goal) {
  return goals.map((goal) => {
    goal.id === updatedGoal.id ? updatedGoal : goal;
  });
}
