function pick<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickMultiple<T>(
  array: T[],
  count: number,
  variance: number = 0,
  unique: boolean = true
) {
  if (count < 0) {
    throw new Error(`Count is less than 0: ${count}`);
  }

  const varianceCorrectedCount =
    count + Math.floor(Math.random() * variance * 2) - variance;

  if (unique) {
    if (count > array.length) {
      throw new Error(
        `Count is greater than array length: ${count} > ${array.length}`
      );
    }

    // If unique, we must have between 0 and the array length items.
    const clampedCount = Math.max(
      0,
      Math.min(varianceCorrectedCount, array.length)
    );

    return array.sort(() => Math.random() - 0.5).slice(0, clampedCount);
  } else {
    // If not unique, we can have more elements than the array length, but cannot
    // be less than 0.
    const clampedCount = Math.max(0, varianceCorrectedCount);

    return Array.from({ length: clampedCount }, () => pick(array));
  }
}

export { pick, pickMultiple };
