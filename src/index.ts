import type { Goal } from "./goals/Goal.js";
import type { CheckIn } from "./checkIns/CheckIn.js";
import {
  loadGoals,
  saveGoals,
  loadCheckIns,
  saveCheckIns,
} from "./goals/goals.js";
import { createMenu } from "./menu/menu.js";
import type { MenuResult } from "./menu/MenuResult.js";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

async function main(): Promise<void> {
  console.log("Starting application");
  //Load at the beginning
  let goals: Goal[] = await loadGoals();
  let checkIns: CheckIn[] = await loadCheckIns();
  const readline = createInterface({
    //creates the interface so we can accept a question.
    input: stdin,
    output: stdout,
  });
  //Run the menu
  let running = true;
  while (running) {
    const result: MenuResult = await createMenu(goals, checkIns, readline);
    running = result.running;
    goals = result.goals;
    checkIns = result.checkIns;
  }
  //Run at the end
  await saveGoals(goals);
  await saveCheckIns(checkIns);
  readline.close();
}

main();
