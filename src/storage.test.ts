import { afterEach, expect, it, vi } from 'vitest';
import { loadRecords, saveRecords } from './storage.js';
const settings = { length: 2, base: 2 };
const record = {
  ...settings,
  attempts: 1,
  durationMs: 100,
  date: '2026-01-01',
};
afterEach(() => vi.unstubAllGlobals());
it('round-trips records through storage', () => {
  const map = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => map.set(key, value),
  });
  expect(saveRecords(settings, [record])).toBe(true);
  expect(loadRecords(settings)).toEqual([record]);
  expect(loadRecords({ length: 3, base: 10 })).toEqual([]);
});
it('tolerates corrupt JSON', () => {
  vi.stubGlobal('localStorage', { getItem: () => '{broken' });
  expect(loadRecords(settings)).toEqual([]);
});
it('handles denied storage', () => {
  vi.stubGlobal('localStorage', {
    getItem: () => {
      throw Error('denied');
    },
    setItem: () => {
      throw Error('denied');
    },
  });
  expect(loadRecords(settings)).toEqual([]);
  expect(saveRecords(settings, [record])).toBe(false);
});
