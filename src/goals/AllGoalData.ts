import type { CountGoalData } from "./CountGoalData.js";
import type { FrequencyGoalData } from "./FrequencyGoalData.js";
import type { ProgressGoalData } from "./ProgressGoalData.js";
import type { StreakGoalData } from "./StreakGoalData.js";

export type AllGoalData =
  | CountGoalData
  | FrequencyGoalData
  | ProgressGoalData
  | StreakGoalData;
