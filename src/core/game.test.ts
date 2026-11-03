import { expect, it } from 'vitest';
import { startGame, submitGuess, rankRecords, isRecord } from './game.js';
it('adds history immutably and leaves previous entries intact', () => {
  const first = startGame({ length: 4, base: 10 }, '0123', 100);
  Object.freeze(first.history);
  Object.freeze(first);
  const second = submitGuess(first, '0132', 200);
  Object.freeze(second.history);
  second.history.forEach(Object.freeze);
  const third = submitGuess(second, '3210', 300);
  expect(first.history).toEqual([]);
  expect(second.history).toEqual([{ guess: '0132', bulls: 2, cows: 2 }]);
  expect(third.history).toHaveLength(2);
  expect(third.history[0]).toBe(second.history[0]);
});
it('rejects duplicates regardless of case', () => {
  const game = submitGuess(
    startGame({ length: 4, base: 16 }, 'abcd', 0),
    'ABDC',
    100,
  );
  expect(submitGuess(game, 'abdc', 200)).toBe(game);
});
it('wins and freezes the finish time against later submissions', () => {
  const game = submitGuess(
    startGame({ length: 2, base: 2 }, '01', 100),
    '01',
    3100,
  );
  expect(game.status).toBe('won');
  expect(game.finishedAt).toBe(3100);
  expect(game.history).toHaveLength(1);
  expect(submitGuess(game, '10', 5000)).toBe(game);
});
it('ignores invalid guesses', () => {
  const game = startGame({ length: 2, base: 2 }, '01', 0);
  expect(submitGuess(game, '00', 1)).toBe(game);
});
it('ranks attempts before duration without mutating the source', () => {
  const record = {
    length: 2,
    base: 2,
    attempts: 2,
    durationMs: 100,
    date: '2026-01-01',
  };
  const records = Object.freeze([
    { ...record, attempts: 1, durationMs: 900 },
    { ...record, durationMs: 90 },
  ]);
  expect(rankRecords(records, record, 2).map((r) => r.durationMs)).toEqual([
    900, 90,
  ]);
  expect(records).toHaveLength(2);
});
it.each([
  null,
  {},
  { length: 3, base: 2, attempts: 1, durationMs: 0, date: '2026-01-01' },
  { length: 2, base: 2, attempts: 1, durationMs: -1, date: '2026-01-01' },
])('rejects malformed record %s', (value) =>
  expect(isRecord(value)).toBe(false),
);
