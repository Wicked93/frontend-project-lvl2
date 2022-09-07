import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (nameOfFormat) => {
  if (nameOfFormat === 'plain') {
    return plain;
  }
  if (nameOfFormat === 'json') {
    return json;
  }
  return stylish;
};

export default getFormatter;
