import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (diff, nameOfFormat) => {
  let result;
  if (nameOfFormat === 'plain') {
    result = diff.flatMap((node) => plain(node));
    return `${result.join('\n')}`;
  }
  if (nameOfFormat === 'json') {
    return JSON.stringify(_.cloneDeep(diff));
  }
  result = diff.map((node) => stylish(node));
  return `{\n${result.join('\n')}\n}`;
};

export default getFormatter;
