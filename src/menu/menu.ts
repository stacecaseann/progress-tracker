import type { Goal } from "../goals/Goal.js";
import type { CheckIn } from "../checkIns/CheckIn.js";
import type { MenuResult } from "./MenuResult.js";
import { type Interface } from "node:readline/promises";
import type { ValueUnit } from "../goals/ValueUnit.js";
import type { FrequencyUnit } from "../goals/FrequencyUnit.js";
import { ProgressGoal } from "../goals/ProgressGoal.js";
import { CountGoal } from "../goals/CountGoal.js";
import { StreakGoal } from "../goals/StreakGoal.js";
import { FrequencyGoal } from "../goals/FrequencyGoal.js";
import type { StreakGoalData } from "../goals/StreakGoalData.js";
import type { ProgressGoalData } from "../goals/ProgressGoalData.js";
import type { CountGoalData } from "../goals/CountGoalData.js";
import type { FrequencyGoalData } from "../goals/FrequencyGoalData.js";

export async function createMenu(
  goals: Goal[],
  checkIns: CheckIn[],
  readline: Interface
): Promise<MenuResult> {
  console.log("1. View Goals"); //Add edit later
  console.log("2. Add Goal");
  console.log("3. Remove Goal");
  console.log("4. Check-In");
  console.log("5. View Progress");
  console.log("6. Quit");
  console.log("");

  let newGoals = goals;
  let newCheckIns = checkIns;
  const answer = await readline.question("Choose an option: ");
  console.log("");
  switch (Number(answer)) {
    case 1:
      await viewGoals(goals, readline);
      break;
    case 2:
      newGoals = await addGoals(goals, readline);
      break;
    case 3:
      newGoals = await removeGoals(goals, readline);
      break;
    case 4:
      newCheckIns = await addCheckIns(goals, checkIns, readline);
      break;
    case 5:
      viewProgress(goals, checkIns);
      break;
    case 6:
      return {
        goals,
        checkIns,
        running: false,
      };
    default:
      throw new Error("That menu item is invalid");
  }

  return {
    goals: newGoals,
    checkIns: newCheckIns,
    running: true,
  };
}

async function viewGoals(goals: Goal[], readline: Interface) {
  showGoals(goals);
  await readline.question("Press Enter to continue...");
  console.log("");
}

function viewProgress(goals: Goal[], checkIns: CheckIn[]) {
  console.log("Progress:");
  console.log();
  goals.forEach((goal, index) => {
    console.log(
      `${index + 1} ${goal.name} - ${goal.calculateProgress(checkIns, new Date(2026, 11, 31)).description}`
    );
  });

  console.log();
}

async function addGoals(goals: Goal[], readline: Interface): Promise<Goal[]> {
  console.log();
  console.log("1. Progress Goal");
  console.log("2. Count Goal");
  console.log("3. Frequency Goal");
  console.log("4. Streak Goal");
  console.log();

  const goalTypeString = await readline.question(
    "Why type of goal would you like to create? "
  );
  const goalType = Number(goalTypeString);

  switch (goalType) {
    case 1: //progress goal
      const progressGoal = await createProgressGoal(readline);
      goals.push(progressGoal);
      break;
    case 2: //Count goal
      const countGoal = await createCountGoal(readline);
      goals.push(countGoal);
      break;
    case 3: //Frequency goal
      const frequencyGoal = await createFrequencyGoal(readline);
      goals.push(frequencyGoal);
      break;
    case 4: //Streak goal
      const streakGoal = await createStreakGoal(readline);
      goals.push(streakGoal);
      break;
    default:
      console.log("Please enter a number between 1 and 4");
      break;
  }

  await readline.question("Press Enter to continue...");
  console.log("");
  return goals;
}

function showGoals(goals: Goal[]) {
  console.log("Goals:");
  console.log();
  goals.forEach((goal, index) => {
    console.log(`${index + 1}. ${goal.description}`);
  });

  console.log();
}

async function createCountGoal(readline: Interface): Promise<Goal> {
  const name = await pickName(readline);
  const valueUnit = await pickValueUnit(readline);
  const startDate = await pickStartDate(readline);
  const goalData: CountGoalData = {
    id: createId(),
    name,
    type: "count",
    startDate,
    valueUnit,
  };
  const goal = new CountGoal(goalData);
  return goal;
}

async function createProgressGoal(readline: Interface): Promise<Goal> {
  const name = await pickName(readline);
  const value = await pickProgressValue(readline);
  const valueUnit = await pickValueUnit(readline);
  const startDate = await pickStartDate(readline);
  const dateBy = await pickDateBy(readline);
  const goalData: ProgressGoalData = {
    id: createId(),
    name,
    type: "progress",
    startDate,
    value,
    valueUnit,
    dateBy,
  };
  const goal = new ProgressGoal(goalData);

  await logFinalGoal(goal);
  return goal;
}

async function logFinalGoal(goal: Goal) {
  console.log("");
  console.log("Here is your final goal:");
  console.log("");
  console.log(goal.description);
}
async function createStreakGoal(readline: Interface): Promise<Goal> {
  const name = await pickName(readline);
  const value = await pickValue(readline);
  const valueUnit = await pickValueUnit(readline);
  const startDate = await pickStartDate(readline);
  const dateBy = await pickDateBy(readline);
  const goalData: StreakGoalData = {
    id: createId(),
    name,
    type: "streak",
    startDate,
    value,
    valueUnit,
    dateBy,
  };
  const goal = new StreakGoal(goalData);
  return goal;
}

async function createFrequencyGoal(readline: Interface): Promise<Goal> {
  const name = await pickName(readline);
  const value = await pickValue(readline);
  const valueUnit = await pickValueUnit(readline);
  const frequency = await pickFrequency(readline);
  const frequencyUnit = await pickFrequencyUnit(readline);
  const startDate = await pickStartDate(readline);
  const dateBy = await pickDateBy(readline);
  const goalData: FrequencyGoalData = {
    id: createId(),
    name,
    type: "frequency",
    startDate,
    value,
    valueUnit,
    frequency,
    frequencyUnit,
    dateBy,
  };
  const goal = new FrequencyGoal(goalData);
  return goal;
}

function createId(): string {
  return crypto.randomUUID();
}
async function pickName(readline: Interface): Promise<string> {
  console.log();
  const name = await readline.question("What do you want to accomplish? ");
  return name;
}
async function pickStartDate(readline: Interface): Promise<Date> {
  console.log();
  const startDate = await readline.question("What day do you want to start? ");
  return new Date(startDate);
}
async function pickValue(readline: Interface): Promise<number> {
  console.log();
  const value = await readline.question("How many min/pages/hours a day? ");
  return Number(value);
}
async function pickProgressValue(readline: Interface): Promise<number> {
  console.log();
  const value = await readline.question(
    "How many total min/pages/hours do you want to reach? "
  );
  return Number(value);
}
async function pickValueUnit(readline: Interface): Promise<ValueUnit> {
  console.log();
  console.log("1. Pages");
  console.log("2. Minutes");
  console.log("3. Hours");
  console.log();

  const valueUnit = await readline.question(
    "What unit will your goal track (1-3)? "
  );
  const valueUnitNumber = Number(valueUnit);
  if (valueUnitNumber == 1) return "pages";
  else if (valueUnitNumber == 2) return "min";
  else if (valueUnitNumber == 3) return "hour";
  else throw Error("Input is not valid");
}

async function pickFrequency(readline: Interface): Promise<number> {
  console.log();
  const value = await readline.question(
    "Daily? (1) or how many times per week/month? "
  );
  return Number(value);
}
async function pickFrequencyUnit(readline: Interface): Promise<FrequencyUnit> {
  console.log();
  console.log("1. Days/week");
  console.log("2. Times per week");
  console.log("3. Times per month");
  console.log();

  const frequencyUnit = await readline.question(
    "What frequency will you do your goal? "
  );
  const frequencyUnitNumber = Number(frequencyUnit);
  if (frequencyUnitNumber == 1) return "day";
  else if (frequencyUnitNumber == 2) return "week";
  else if (frequencyUnitNumber == 3) return "month";
  else throw Error("Input is not valid");
}

async function pickDateBy(readline: Interface): Promise<Date | undefined> {
  console.log();
  const dateBy = await readline.question(
    "What is your deadline (or 1 for no date)? "
  );
  if (dateBy === "1") return undefined;
  else return new Date(dateBy);
}

async function removeGoals(
  goals: Goal[],
  readline: Interface
): Promise<Goal[]> {
  showGoals(goals);
  const menu = await readline.question("Which goal would you like to remove? ");

  const goalNumber = Number(menu);
  const goalPicked = goals[goalNumber - 1];
  if (!goalPicked) return goals;
  const newGoals = goals.filter((goal) => goal.id != goalPicked?.id);
  console.log("");
  console.log("Goal removed");
  await readline.question("Press Enter to continue...");
  console.log("");
  return newGoals;
}

async function addCheckIns(
  goals: Goal[],
  checkIns: CheckIn[],
  readline: Interface
): Promise<CheckIn[]> {
  viewProgress(goals, checkIns);
  const menu = await readline.question("Choose a goal to check in for: ");

  const goalNumber = Number(menu);
  const goalPicked = goals[goalNumber - 1];
  if (!goalPicked) return checkIns;
  console.log("These are the current check-ins");
  viewCheckIns(goalPicked, checkIns);
  console.log("");

  const checkInDate = await pickCheckInDate(readline);
  const value = await pickCheckInValue(goalPicked, readline);
  const newCheckIn: CheckIn = {
    goalId: goalPicked.id,
    checkInDate,
    value,
  };
  checkIns.push(newCheckIn);
  viewProgressForOneGoal(goalPicked, checkIns);
  console.log("");
  await readline.question("Press Enter to continue...");
  console.log("");

  return checkIns;
}

async function pickCheckInDate(readline: Interface): Promise<Date> {
  console.log();
  const startDate = await readline.question("What day? ");
  return new Date(startDate);
}

async function pickCheckInValue(
  goal: Goal,
  readline: Interface
): Promise<number> {
  console.log();

  const value = await readline.question(`How many ${goal.valueUnit}? `);
  return Number(value);
}

function viewCheckIns(goal: Goal, checkIns: CheckIn[]) {
  console.log("");

  const currentCheckIns = checkIns.filter(
    (checkIn) => checkIn.goalId === goal.id
  );

  currentCheckIns.forEach((checkIn) =>
    console.log(
      `${checkIn.checkInDate.toLocaleDateString()}: ${checkIn.value} ${goal.valueUnit}`
    )
  );
}
function viewProgressForOneGoal(goal: Goal, checkIns: CheckIn[]) {
  console.log("Progress:");
  console.log("");
  console.log(
    `${goal.name} - ${goal.calculateProgress(checkIns, new Date(2026, 11, 31)).description}`
  );
  console.log("");
}
