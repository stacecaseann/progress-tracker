import { describe, expect, test } from "@jest/globals";
import {
  readGoalsFromFile as readGoals,
  saveGoalsToFile as saveGoals,
  readCheckInsFromFile as readCheckIns,
  saveCheckInsToFile as saveCheckIns,
} from "../src/files/fileUtil.ts";
import type { FrequencyGoalData } from "../src/goals/FrequencyGoalData.ts";

describe("readGoals", () => {
  test("goals find each type", async () => {
    process.env.GOAL_FILE_PATH = "./tests/data/goals.output.test.json";
    const goals = await readGoals();
    expect(goals).toHaveLength(4);
    const frequencyGoal = goals.find((goal) => goal.type === "frequency");
    expect(frequencyGoal).toBeDefined();
    if (frequencyGoal?.type === "frequency") {
      //I can do this because I put a specific type on the goaldata, and it can narrow down magically
      expect(frequencyGoal.frequencyUnit).toBe("day");
    }

    const countGoal = goals.find((goal) => goal.type === "count");
    expect(countGoal).toBeDefined();
    if (countGoal?.type === "count") {
      expect(countGoal.valueUnit).toBe("min");
    }

    const progressGoal = goals.find((goal) => goal.type === "progress");
    expect(progressGoal).toBeDefined();
    if (progressGoal?.type === "progress") {
      expect(progressGoal.valueUnit).toBe("min");
    }

    const streakGoal = goals.find((goal) => goal.type === "streak");
    expect(streakGoal).toBeDefined();
    if (streakGoal?.type === "streak") {
      expect(streakGoal.valueUnit).toBe("min");
    }
  });
});

describe("saveGoals", () => {
  const testPath = "./tests/data/savegoals.output.test.json";
  test("goals save", async () => {
    const frequencyGoalData: FrequencyGoalData = {
      id: "1",
      name: "Practice Piano",
      type: "frequency",
      startDate: new Date(2026, 0, 1),
      value: 20,
      valueUnit: "min",
      frequency: 3,
      frequencyUnit: "week",
      dateBy: new Date(2026, 0, 31),
    };

    process.env.GOAL_FILE_PATH = testPath;
    await saveGoals([frequencyGoalData]);
    const data = await readGoals();
    expect(data).toHaveLength(1);
    expect(data[0].type).toBe("frequency");
  });
});
