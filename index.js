import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export const engineDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(`./files/${filepath1}`, 'utf-8'));
  const file2 = JSON.parse(fs.readFileSync(`./files/${filepath2}`, 'utf-8'));

  const keysOfFile1 = Object.keys(file1).sort();
  const keysOfFile2 = Object.keys(file2).sort();
  const sortFiles = _.sortBy(_.union(keysOfFile1, keysOfFile2));
  
  const analyzedChanges = sortFiles.map((key) => {
    if (!keysOfFile2.includes(key)) {
        return {
            key: key,
            type: 'deleted',
            value: file1[key],
        }
    }
    if (!keysOfFile1.includes(key)) {
        return {
            key: key,
            type: 'added',
            value: file2[key],
        }
    }
   if (file1[key] === file2[key]) {
    return {
        key: key,
        type: 'unchanged',
        value: file1[key],
    }
   }
   return {
    key: key,
    type: 'changed',
    oldValue: file1[key],
    newValue: file2[key],
}
  });

  const result = analyzedChanges.map((node) => {
    const { key, type, value, oldValue, newValue } = node;
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
  })
  return `\n${result.join('\n')}\n`;
};