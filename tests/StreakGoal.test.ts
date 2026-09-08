import { describe, expect, test } from "@jest/globals";
import type { StreakGoalData } from "../src/goals/StreakGoalData.js";
import { StreakGoal } from "../src/goals/StreakGoal.js";
describe("description", () => {
  test("with no dateBy", () => {
    const streakGoalData: StreakGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      value: 20,
      valueUnit: "min",
      dateBy: undefined,
    };
    const goal = new StreakGoal(streakGoalData);
    expect(goal.description).toBe("Practice Piano 20 min every day");
  });
  test("with dateBy", () => {
    const StreakGoalData: StreakGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      value: 20,
      valueUnit: "min",
      dateBy: new Date(2026, 11, 31),
    };
    const goal = new StreakGoal(StreakGoalData);
    expect(goal.description).toBe(
      "Practice Piano 20 min every day until 12/31/2026"
    );
  });
});
