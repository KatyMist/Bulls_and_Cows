import { expect, it } from 'vitest';
import { countPossibleSecrets, memoize } from './countPossibleSecrets.js';
it.each([
  [0, 0, 1],
  [2, 2, 2],
  [4, 10, 5040],
  [6, 16, 5765760],
  [2, 8, 56],
])('counts P(%i,%i)', (length, base, result) =>
  expect(countPossibleSecrets(length, base)).toBe(result),
);
it.each([
  [-1, 10],
  [3, 2],
  [1.5, 8],
  [2, 17],
])('rejects invalid arguments', (length, base) =>
  expect(() => countPossibleSecrets(length, base)).toThrow(RangeError),
);
it('memoizes repeated calls including zero results', () => {
  let calls = 0;
  const cached = memoize((a: number, b: number) => {
    calls += 1;
    return a * b;
  });
  expect(cached(0, 2)).toBe(0);
  expect(cached(0, 2)).toBe(0);
  expect(calls).toBe(1);
  expect(cached(2, 2)).toBe(4);
  expect(calls).toBe(2);
});
