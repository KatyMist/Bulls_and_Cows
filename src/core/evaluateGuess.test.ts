import { expect, it } from 'vitest';
import { evaluateGuess } from './evaluateGuess.js';
it.each([
  ['0123', '0123', 4, 0],
  ['0123', '3210', 0, 4],
  ['0123', '0451', 1, 1],
  ['0123', '4567', 0, 0],
  ['aB09', 'Ab90', 2, 2],
  ['0123', '0132', 2, 2],
])('compares %s to %s', (secret, guess, bulls, cows) =>
  expect(evaluateGuess(secret, guess)).toEqual({ bulls, cows }),
);
