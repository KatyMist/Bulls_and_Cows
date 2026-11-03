import { describe, expect, it } from 'vitest';
import { createDigitValidator } from './createDigitValidator.js';
describe('createDigitValidator', () => {
  it.each([
    [2, '0', true],
    [2, '2', false],
    [8, '7', true],
    [8, '8', false],
    [10, '9', true],
    [16, 'A', true],
    [16, 'f', true],
    [16, 'g', false],
    [16, 'ab', false],
    [10, '', false],
    [10, ' ', false],
  ])('base %i / %s', (base, char, valid) =>
    expect(createDigitValidator(base)(char)).toBe(valid),
  );
  it('rejects unsupported bases', () =>
    expect(() => createDigitValidator(3)).toThrow(RangeError));
});
