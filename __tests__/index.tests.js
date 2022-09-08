import { expect, test } from '@jest/globals';
import engineDiff from '../index.js';
import { correctStylishDiff, correctPlainDiff } from '../__fixtures__/correctResults/correctResult.js'

test('stylish test', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';

  expect(engineDiff(filepath1, filepath2)).toBe(correctStylishDiff);
});

test('plain test', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';

  expect(engineDiff(filepath1, filepath2, 'plain')).toBe(correctPlainDiff);
});
