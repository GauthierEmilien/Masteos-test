const longestString = (arr) =>
  arr.reduce(
    (acc, curr) =>
      typeof curr === "string" && curr.length > acc.length ? curr : acc,
    ""
  );
