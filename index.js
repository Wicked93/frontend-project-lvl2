import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parsers from './src/parsers.js';
import getFormatter from './src/formatters/index.js';

export const getPath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    fs.readFileSync(filePath, 'utf-8');
  }
  return fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', filePath), 'utf-8');
};

export const getExtName = (filePath) => path.extname(filePath);

const buildTreeOfChanges = (obj1, obj2) => {
  const keys = [obj1, obj2].flatMap(Object.keys);
  const sortKeys = _.sortBy(_.union(keys));
  const nodes = sortKeys.map((key) => {
    const [value1, value2] = [obj1[key], obj2[key]];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'object',
        children: buildTreeOfChanges(value1, value2),
      };
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      };
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: value1,
      };
    }
    if (value1 === value2) {
      return {
        key,
        type: 'unchanged',
        value: value1,
      };
    }
    return {
      key,
      type: 'changed',
      value: value2,
      oldValue: value1,
    };
  });
  return nodes;
};

export default (filepath1, filepath2, formatName) => {
  const path1 = getPath(filepath1);
  const extName1 = getExtName(filepath1);
  const path2 = getPath(filepath2);
  const extName2 = getExtName(filepath2);
  const obj1 = parsers(path1, extName1);
  const obj2 = parsers(path2, extName2);
  const diff = buildTreeOfChanges(obj1, obj2);
  return getFormatter(diff, formatName);
};
