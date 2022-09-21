import _ from 'lodash';

const getValue = (value) => {
  if (value === null) {
    return `${value}`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const getStyle = (obj, path = '') => {
  const {
    key,
    type,
  } = obj;

  if (type === 'object') {
    const { children } = obj;
    return children.flatMap((child) => getStyle(child, `${path}${key}.`)).join('\n');
  }
  const fullPath = `${path}${key}`;
  if (type === 'deleted') {
    return `Property '${fullPath}' was removed`;
  }
  if (type === 'added') {
    const { value } = obj;
    return `Property '${fullPath}' was added with value: ${getValue(value)}`;
  }
  if (type === 'changed') {
    const {
      value,
      oldValue,
    } = obj;
    return `Property '${fullPath}' was updated. From ${getValue(oldValue)} to ${getValue(value)}`;
  }
  return [];
};

const formatPlain = (diff) => {
  const result = diff.flatMap((node) => getStyle(node));
  return `${result.join('\n')}`;
};

export default formatPlain;
