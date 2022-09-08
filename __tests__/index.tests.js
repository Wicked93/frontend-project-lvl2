import { expect, test } from '@jest/globals';
import engineDiff from '../index.js';
import { correctStylishDiff, correctPlainDiff, correctJSONDiff } from '../__fixtures__/correctResults/correctResult.js'

test('stylish JSON test', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';

  expect(engineDiff(filepath1, filepath2)).toBe(correctStylishDiff);
});

test('plain JSON test', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';

  expect(engineDiff(filepath1, filepath2, 'plain')).toBe(correctPlainDiff);
});

test('stylish YAML test', () => {
  const filepath1 = 'file1.yml';
  const filepath2 = 'file2.yml';

  expect(engineDiff(filepath1, filepath2)).toBe(correctStylishDiff);
});

test('plain YAML test', () => {
  const filepath1 = 'file1.yml';
  const filepath2 = 'file2.yml';

  expect(engineDiff(filepath1, filepath2, 'plain')).toBe(correctPlainDiff);
});

test('JSON test', () => {
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';

  expect(engineDiff(filepath1, filepath2, 'json')).toBe(correctJSONDiff);
});
