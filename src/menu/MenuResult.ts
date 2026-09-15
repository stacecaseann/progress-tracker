import type { CheckIn } from "../checkIns/CheckIn.js";
import type { Goal } from "../goals/Goal.js";

//This type will be returned from the menu so the program will know if it should keep going
export type MenuResult = {
  goals: Goal[];
  checkIns: CheckIn[];
  running: boolean;
};
