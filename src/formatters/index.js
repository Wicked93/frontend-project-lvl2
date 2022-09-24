import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormatter = (diff, nameOfFormat) => {
  if (nameOfFormat === 'plain') {
    return formatPlain(diff);
  }
  if (nameOfFormat === 'json') {
    return JSON.stringify(diff);
  }
  if (nameOfFormat === 'stylish') {
    return formatStylish(diff);
  }
  return Error(`Format ${nameOfFormat} is not found`);
};

export default getFormatter;
