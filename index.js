import _ from 'lodash';
import parsers from './src/parsers.js';
import getFormatter from './src/formatters/index.js';

const analyzeChanges = (obj1, obj2) => {
  const keys = [obj1, obj2].flatMap(Object.keys);
  const sortKeys = _.sortBy(_.union(keys));
  const nodes = sortKeys.map((key) => {
    const [value1, value2] = [obj1[key], obj2[key]];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'object',
        children: analyzeChanges(value1, value2),
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
  const obj1 = parsers(filepath1);
  const obj2 = parsers(filepath2);
  const diff = analyzeChanges(obj1, obj2);
  const formatter = getFormatter(formatName);
  return formatter(diff);
};
