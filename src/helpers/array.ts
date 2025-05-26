function pick<T extends readonly any[]>(array: T) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickMultiple<T extends readonly any[]>(
  array: T,
  count: number,
  unique: boolean = true
) {
  if (count < 0) {
    throw new Error(`Count is less than 0: ${count}`);
  }

  if (unique) {
    if (count > array.length) {
      throw new Error(
        `Count is greater than array length: ${count} > ${array.length}`
      );
    }

    return [...array].sort(() => Math.random() - 0.5).slice(0, count);
  } else {
    return Array.from({ length: count }, () => pick(array));
  }
}

export { pick, pickMultiple };
