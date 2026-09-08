import { describe, expect, test } from "@jest/globals";
import type { FrequencyGoalData } from "../src/goals/FrequencyGoalData.js";
import { FrequencyGoal } from "../src/goals/FrequencyGoal.js";
describe("description", () => {
  test("daily no date", () => {
    const frequencyGoalData: FrequencyGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      value: 20,
      valueUnit: "min",
      frequency: 1,
      frequencyUnit: "day",
      dateBy: undefined,
    };
    const goal = new FrequencyGoal(frequencyGoalData);
    expect(goal.description).toBe("Practice Piano 20 min a day every day");
  });
  test("daily with date", () => {
    const frequencyGoalData: FrequencyGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      value: 20,
      valueUnit: "min",
      frequency: 1,
      frequencyUnit: "day",
      dateBy: new Date(2026, 11, 31),
    };
    const goal = new FrequencyGoal(frequencyGoalData);
    expect(goal.description).toBe(
      "Practice Piano 20 min a day every day until 12/31/2026"
    );
  });
});
