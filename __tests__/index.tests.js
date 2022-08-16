import { expect, test } from '@jest/globals';
import engineDiff from '../index';

test('hhd', () => {
  expect(engineDiff(filepath2.json, filepath2.json)).toEqual(`- follow: false\nhost: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true`);
});
