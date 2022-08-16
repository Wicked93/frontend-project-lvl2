import _ from 'lodash';
import path from 'path';
import parsers from './bin/parsers.js';

const engineDiff = (filepath1, filepath2) => {
  const pathOfFile1 = path.resolve(process.cwd(), `./__fixtures__/${filepath1}`);
  const pathOfFile2 = path.resolve(process.cwd(), `./__fixtures__/${filepath2}`);
  const file1 = parsers(filepath1, pathOfFile1);
  const file2 = parsers(filepath2, pathOfFile2);

  const keysOfFile1 = Object.keys(file1).sort();
  const keysOfFile2 = Object.keys(file2).sort();
  const sortFiles = _.sortBy(_.union(keysOfFile1, keysOfFile2));

  const analyzedChanges = sortFiles.map((key) => {
    if (!keysOfFile2.includes(key)) {
      return {
        key,
        type: 'deleted',
        value: file1[key],
      };
    }
    if (!keysOfFile1.includes(key)) {
      return {
        key,
        type: 'added',
        value: file2[key],
      };
    }
    if (file1[key] === file2[key]) {
      return {
        key,
        type: 'unchanged',
        value: file1[key],
      };
    }
    return {
      key,
      type: 'changed',
      oldValue: file1[key],
      newValue: file2[key],
    };
  });

  const result = analyzedChanges.map((node) => {
    const {
      key, type, value, oldValue, newValue,
    } = node;
    if (type === 'deleted') {
      return `- ${key}: ${value}`;
    }
    if (type === 'added') {
      return `+ ${key}: ${value}`;
    }
    if (type === 'unchanged') {
      return `  ${key}: ${value}`;
    }
    if (type === 'changed') {
      return `- ${key}: ${oldValue}\n+ ${key}: ${newValue}`;
    }
  });
  return `\n${result.join('\n')}\n`;
};

export default engineDiff;
