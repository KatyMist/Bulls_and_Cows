import { isRecord, type RecordEntry, type Settings } from './core/game.js';
const keyFor = ({ length, base }: Settings): string =>
  `bulls-and-cows:v1:${base}:${length}`;
export function loadRecords(settings: Settings): readonly RecordEntry[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(keyFor(settings)) ?? '[]',
    );
    return Array.isArray(value)
      ? value
          .filter(isRecord)
          .filter(
            (r) => r.length === settings.length && r.base === settings.base,
          )
          .sort(
            (a, b) => a.attempts - b.attempts || a.durationMs - b.durationMs,
          )
          .slice(0, 10)
      : [];
  } catch {
    return [];
  }
}
export function saveRecords(
  settings: Settings,
  records: readonly RecordEntry[],
): boolean {
  try {
    localStorage.setItem(keyFor(settings), JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
}
