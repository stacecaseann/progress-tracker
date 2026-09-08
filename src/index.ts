import { CountGoal } from "./goals/CountGoal.js";
import { FrequencyGoal } from "./goals/FrequencyGoal.js";
import { Goal } from "./goals/Goal.js";
import { ProgressGoal } from "./goals/ProgressGoal.js";
import { StreakGoal } from "./goals/StreakGoal.js";
const goals: Goal[] = [];

goals.push(
  new CountGoal({
    id: crypto.randomUUID(),
    name: "Practice Piano",
    valueUnit: "min",
  })
);
goals.push(
  new ProgressGoal({
    id: crypto.randomUUID(),
    name: "Practice Piano",
    value: 20,
    valueUnit: "min",
    dateBy: new Date("2026-12-31"),
  })
);

goals.push(
  new FrequencyGoal({
    id: crypto.randomUUID(),
    name: "Practice Piano",
    value: 20,
    valueUnit: "min",
    dateBy: undefined,
    frequency: 3,
    frequencyUnit: "day",
  })
);

goals.push(
  new StreakGoal({
    id: crypto.randomUUID(),
    name: "Practice Piano",
    value: 20,
    valueUnit: "min",
    dateBy: new Date("2026-12-31"),
  })
);

goals.forEach((goal) =>
  console.log({ ...goal, description: goal.description })
);
