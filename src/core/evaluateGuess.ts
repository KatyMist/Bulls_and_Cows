export interface Evaluation {
  readonly bulls: number;
  readonly cows: number;
}
export function evaluateGuess(secret: string, guess: string): Evaluation {
  const normalizedSecret = secret.toLowerCase();
  const digits = [...guess.toLowerCase()];
  const secretDigits = new Set(normalizedSecret);
  const bulls = digits.filter(
    (digit, index) => digit === normalizedSecret[index],
  ).length;
  const matches = digits.reduce(
    (total, digit) => total + Number(secretDigits.has(digit)),
    0,
  );
  return { bulls, cows: matches - bulls };
}
