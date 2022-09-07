import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (nameOfFormat) => {
  if (nameOfFormat === 'plain') {
    return plain;
  }
  return stylish;
};

export default getFormatter;
