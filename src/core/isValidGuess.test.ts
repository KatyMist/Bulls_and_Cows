import { expect, it } from 'vitest';
import { isValidGuess } from './isValidGuess.js';
it.each([
  ['0123', 4, 10, true],
  ['aB09', 4, 16, true],
  ['aA09', 4, 16, false],
  ['0012', 4, 10, false],
  ['123', 4, 10, false],
  ['128', 3, 8, false],
  ['01', 2, 2, true],
  ['012', 3, 2, false],
  ['12 3', 4, 10, false],
  ['', 0, 10, false],
])('validates %s', (guess, length, base, result) =>
  expect(isValidGuess(guess, length, base)).toBe(result),
);
