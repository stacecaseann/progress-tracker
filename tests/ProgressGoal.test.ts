import { describe, expect, test } from "@jest/globals";
import type { ProgressGoalData } from "../src/goals/ProgressGoalData.js";
import { ProgressGoal } from "../src/goals/ProgressGoal.js";
describe("description", () => {
  test("with no dateBy", () => {
    const progressGoalData: ProgressGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      value: 200,
      valueUnit: "min",
      dateBy: undefined,
    };
    const goal = new ProgressGoal(progressGoalData);
    expect(goal.description).toBe("Practice Piano 200 min");
  });
  test("with dateBy", () => {
    const progressGoalData: ProgressGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      value: 200,
      valueUnit: "min",
      dateBy: new Date(2026, 11, 31),
    };
    const goal = new ProgressGoal(progressGoalData);
    expect(goal.description).toBe("Practice Piano 200 min by 12/31/2026");
  });
});
