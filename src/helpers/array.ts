function pick<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickMultiple<T>(array: T[], count: number) {
  if (count > array.length) {
    throw new Error("Count is greater than array length");
  }

  return array.sort(() => Math.random() - 0.5).slice(0, count);
}

export { pick, pickMultiple };
