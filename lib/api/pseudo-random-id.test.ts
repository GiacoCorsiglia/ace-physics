import { generatePseudoRandomIds } from "./pseudo-random-id";

function* range(start: number, stop?: number) {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  for (; start < stop; start++) {
    yield start;
  }
}

it("range function creates ranges", () => {
  expect([...range(5)]).toEqual([0, 1, 2, 3, 4]);
  expect([...range(3, 7)]).toEqual([3, 4, 5, 6]);
});

it("generates every integer in the range", () => {
  const correct = new Set(range(900_000));

  const randoms = generatePseudoRandomIds(0, 900_000, 123);

  const difference = [...randoms].filter((x) => !correct.has(x));

  expect(difference.length).toBe(0);
});

it("is deterministic with same seed", () => {
  const randoms1 = [...generatePseudoRandomIds(5, 15, 123)];
  const randoms2 = [...generatePseudoRandomIds(5, 15, 123)];
  expect(randoms1).toStrictEqual(randoms2);

  const randoms3 = [...generatePseudoRandomIds(5, 15, 543)];
  const randoms4 = [...generatePseudoRandomIds(5, 15, 543)];
  expect(randoms3).toStrictEqual(randoms4);

  expect(randoms1).not.toStrictEqual(randoms4);
});

it("yields the right number of numbers", () => {
  const randoms = generatePseudoRandomIds(5, 80, 123);
  expect([...randoms].length).toBe(75);
});

it("is reasonably random-looking", () => {
  const size = 500;

  // https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)
  const desiredMean = 900_000 / 2;
  const desiredVariance = 900_000 ** 2 / 12;

  for (const seed of [123, 543, 7123, 98417, 451387]) {
    const randoms = [...generatePseudoRandomIds(0, size, seed)];
    const mean = randoms.reduce((a, b) => a + b, 0) / size;
    const variance =
      randoms.map((a) => (a - mean) ** 2).reduce((a, b) => a + b, 0) / size;

    // Within 5% seems good enough to me.
    expect(mean - desiredMean).toBeLessThan(desiredMean / 20);
    expect(variance - desiredVariance).toBeLessThan(desiredVariance / 20);
  }
});
