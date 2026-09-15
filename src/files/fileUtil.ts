import { readFile, writeFile } from "node:fs/promises";
import type { AllGoalData } from "../goals/AllGoalData.js";
import type { CheckInData } from "../checkIns/CheckIn.js";

//This will save the array of Goals that have been convereted to data to the json file
//AllGoalData can be any type of goal data
export async function saveGoalsToFile(data: AllGoalData[]) {
  const json = JSON.stringify(data, null, 2); //null means don't filter anythig, 2 means indent the json 2 spaces
  const path = process.env.GOAL_FILE_PATH;
  if (!path) throw new Error("Goals file path is not set up");
  await writeFile(path, json);
}

//This will take the json file and return the goal data, which can be in any goal shape
export async function readGoalsFromFile(): Promise<AllGoalData[]> {
  const path = process.env.GOAL_FILE_PATH;
  if (!path) throw new Error("Goals file path is not set up");
  const data = await readFile(path, "utf-8");
  return JSON.parse(data);
}

//This will get the check-ins from the json file in the data format
export async function saveCheckInsToFile(data: CheckInData[]) {
  const json = JSON.stringify(data, null, 2); //null means don't filter anythig, 2 means indent the json 2 spaces
  const path = process.env.CHECKIN_FILE_PATH;
  if (!path) throw new Error("CheckIns file path is not set up");
  await writeFile(path, json);
}

//This will save the check-ins from the data format to json
export async function readCheckInsFromFile(): Promise<CheckInData[]> {
  const path = process.env.CHECKIN_FILE_PATH;
  if (!path) throw new Error("CheckIns file path is not set up");
  const data = await readFile(path, "utf-8");
  return JSON.parse(data);
}
