export type GoalData = {
  id: string;
  name: string;
};

export type GoalUpdates = Partial<Omit<GoalData, "id">>;
