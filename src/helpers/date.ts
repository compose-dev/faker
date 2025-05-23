const ONE_HOUR_IN_MS = 60 * 60 * 1000;
const ONE_DAY_IN_MS = 24 * ONE_HOUR_IN_MS;

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * ONE_DAY_IN_MS);
}

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * ONE_HOUR_IN_MS);
}

export { addDays, addHours };
