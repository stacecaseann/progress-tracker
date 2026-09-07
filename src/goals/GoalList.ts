import { Goal } from "./Goal.js";
export class GoalList {
  constructor(public goals: Goal[]) {}
}
/*
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}*/
