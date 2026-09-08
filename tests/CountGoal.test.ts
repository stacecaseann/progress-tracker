import { describe, expect, test } from "@jest/globals";
import type {
  CountGoalData,
  CountGoalUpdates,
} from "../src/goals/CountGoalData.js";
import { CountGoal } from "../src/goals/CountGoal.js";
import { Goal } from "../src/goals/Goal.js";

describe("description", () => {
  test("expects description", () => {
    const countGoalData: CountGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      valueUnit: "min",
    };
    const goal = new CountGoal(countGoalData);
    expect(goal.description).toBe("Practice Piano (count min)");
  });
});

describe("update", () => {
  test("is immutable", () => {
    const countGoalData: CountGoalData = {
      id: crypto.randomUUID(),
      name: "Practice Piano",
      valueUnit: "min",
    };
    const goal = new CountGoal(countGoalData);

    let goalList: Goal[] = [goal];
    const updateGoalData: CountGoalUpdates = {
      name: "Practice Guitar",
    };
    const updatedGoal = goal.updateGoal(updateGoalData);
    expect(updatedGoal.name).toBe("Practice Guitar");
    expect(goalList[0].name).toBe("Practice Piano");
  });
});
