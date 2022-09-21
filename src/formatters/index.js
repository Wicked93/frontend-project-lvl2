import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormatter = (diff, nameOfFormat) => {
  if (nameOfFormat === 'plain') {
    return formatPlain(diff);
  }
  if (nameOfFormat === 'json') {
    return JSON.stringify(_.cloneDeep(diff));
  }
  return formatStylish(diff);
};

export default getFormatter;
