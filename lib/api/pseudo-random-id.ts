export function* generatePseudoRandomIds(
  from: number,
  to: number,
  seed: number,
  shift: number = 0
) {
  // What a lucky prime!
  const prime = 900_001;
  const max = prime - 1;
  // This must be a "primitive root" of the prime
  const root = 23;

  if (
    from < 0 ||
    from > max ||
    to < 0 ||
    to > max ||
    from > to ||
    seed < 0 ||
    seed > max
  ) {
    throw new Error();
  }

  let random = seed;
  for (let i = 0; i < to; i++) {
    random = (root * random) % prime;
    if (i >= from) {
      // Subtract off 1 here so we get 0 -> 899,999 not 1 -> 900,000
      yield random - 1 + shift;
    }
  }
}
