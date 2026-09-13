import type { CheckIn } from "../checkIns/CheckIn.js";
import type { Goal } from "../goals/Goal.js";

export type MenuResult = {
  goals: Goal[];
  checkIns: CheckIn[];
  running: boolean;
};
