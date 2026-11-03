import { expect, it } from 'vitest';
import { generateSecret } from './generateSecret.js';
it('uses injected random and preserves leading zero', () =>
  expect(generateSecret(4, 10, () => 0)).toBe('0123'));
it('can pick the last remaining digit', () =>
  expect(generateSecret(4, 16, () => 0.999)).toBe('fedc'));
it.each([2, 8, 10, 16])('generates unique digits for base %i', (base) => {
  const length = Math.min(base, 6);
  const result = generateSecret(length, base, () => 0.5);
  expect(result).toHaveLength(length);
  expect(new Set(result).size).toBe(length);
  expect([...result].every((d) => parseInt(d, 16) < base)).toBe(true);
});
it.each([
  [3, 2],
  [1, 10],
  [7, 16],
  [2, 3],
  [2.5, 10],
])('rejects invalid settings %i %i', (length, base) =>
  expect(() => generateSecret(length, base, () => 0)).toThrow(RangeError),
);
it.each([-0.1, 1, NaN, Infinity])('rejects random value %s', (value) =>
  expect(() => generateSecret(2, 10, () => value)).toThrow(RangeError),
);
