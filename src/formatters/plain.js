import _ from 'lodash';

const getValue = (value) => {
  if (!_.isObject(value)) {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return `${value}`;
  }
  return '[complex value]';
};

const getStyle = (obj, path = '') => {
  const {
    key,
    type,
    value,
    oldValue,
    children,
  } = obj;

  if (type === 'object') {
    return children.flatMap((child) => getStyle(child, `${path}${key}.`)).join('\n');
  }
  const fullPath = `${path}${key}`;
  if (type === 'deleted') {
    return `Property '${fullPath}' was removed`;
  }
  if (type === 'added') {
    return `Property '${fullPath}' was added with value: ${getValue(value)}`;
  }
  if (type === 'changed') {
    return `Property '${fullPath}' was updated. From ${getValue(oldValue)} to ${getValue(value)}`;
  }
  return [];
};

export default getStyle;
