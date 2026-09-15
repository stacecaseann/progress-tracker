import type { CountGoalData } from "./CountGoalData.js";
import type { FrequencyGoalData } from "./FrequencyGoalData.js";
import type { ProgressGoalData } from "./ProgressGoalData.js";
import type { StreakGoalData } from "./StreakGoalData.js";

//This type includes all types of goal data so they can all be stored in an array together
export type AllGoalData =
  | CountGoalData
  | FrequencyGoalData
  | ProgressGoalData
  | StreakGoalData;
