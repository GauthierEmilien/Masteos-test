const arraySum = (arr) =>
  arr
    .filter((c) => typeof c === "number" || Array.isArray(c))
    .reduce(
      (acc, curr) => (Array.isArray(curr) ? acc + arraySum(curr) : acc + curr),
      0
    );
