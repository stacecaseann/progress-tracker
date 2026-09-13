export function daysBetween(startDate: Date, endDate: Date): number {
  const milliseconds = endDate.getTime() - startDate.getTime();
  const days = milliseconds / (1000 * 60 * 60 * 24);
  return days;
}

export function weeksBetween(startDate: Date, endDate: Date): number {
  const days = daysBetween(startDate, endDate);
  const weeks = Math.ceil(days / 7);
  return weeks;
}

export function addDay(startDate: Date): Date {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);
  return endDate;
}
export function addWeek(startDate: Date): Date {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);
  return endDate;
}

export function monthsBetween(startDate: Date, endDate: Date): number {
  //probably good enough to divide beg/end date by 30
  const days = daysBetween(startDate, endDate);
  const months = Math.ceil(days / 30);
  return months;
}

export function addMonth(startDate: Date): Date {
  //just add 30 days to last day for now
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);
  return endDate;
}
