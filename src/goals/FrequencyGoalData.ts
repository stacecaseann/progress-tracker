import type { GoalData } from "./GoalData.js";

export type FrequencyGoalData = GoalData;

export type FrequencyGoalUpdates = Partial<Omit<FrequencyGoalData, "id">>;
